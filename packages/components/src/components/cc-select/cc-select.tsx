import { Component, Host, Prop, State, Element, Event, EventEmitter, h } from '@stencil/core';

interface OptionItem {
  value: string;
  label: string;
  disabled: boolean;
}

@Component({
  tag: 'cc-select',
  styleUrl: 'cc-select.scss',
  shadow: true,
})
export class CcSelect {
  @Element() el!: HTMLElement;

  @State() private options: OptionItem[] = [];

  /** Bound value — must match one of the option values */
  @Prop({ mutable: true, reflect: false }) value: string = '';

  /** Label displayed above the select */
  @Prop() label: string = '';

  /** Placeholder option shown when no value is selected */
  @Prop() placeholder: string = '';

  /** Helper text displayed below the select */
  @Prop() hint: string = '';

  /** Error message — also puts the select in an error state */
  @Prop() error: string = '';

  /** Size variant */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** Disables the select */
  @Prop() disabled: boolean = false;

  /** Marks the select as required */
  @Prop() required: boolean = false;

  /** Associates select with a form element id */
  @Prop() name: string = '';

  /** Emitted when the selected value changes */
  @Event() ccChange!: EventEmitter<string>;

  /** Emitted when the select loses focus */
  @Event() ccBlur!: EventEmitter<void>;

  /** Emitted when the select gains focus */
  @Event() ccFocus!: EventEmitter<void>;

  private observer?: MutationObserver;

  componentDidLoad() {
    this.syncOptions();
    this.observer = new MutationObserver(() => this.syncOptions());
    this.observer.observe(this.el, { childList: true, subtree: true, characterData: true });
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }

  private syncOptions() {
    this.options = Array.from(this.el.querySelectorAll('option')).map((opt) => ({
      value: opt.value,
      label: opt.textContent?.trim() ?? '',
      disabled: opt.disabled,
    }));
  }

  private handleChange = (e: Event) => {
    this.value = (e.target as HTMLSelectElement).value;
    this.ccChange.emit(this.value);
  };

  render() {
    const hasError = !!this.error;
    const hasOptions = this.options.length > 0;
    const selectId = this.name || 'cc-select';

    return (
      <Host>
        {this.label && (
          <label class="cc-select__label" htmlFor={selectId}>
            {this.label}
            {this.required && (
              <span class="cc-select__required" aria-hidden="true">
                {' '}
                *
              </span>
            )}
          </label>
        )}

        <div
          class={{
            'cc-select__wrapper': true,
            [`cc-select__wrapper--${this.size}`]: true,
            'cc-select__wrapper--error': hasError,
            'cc-select__wrapper--disabled': this.disabled || !hasOptions,
          }}
        >
          <select
            id={selectId}
            class="cc-select__field"
            name={this.name}
            disabled={this.disabled || !hasOptions}
            required={this.required}
            aria-invalid={hasError ? 'true' : null}
            aria-describedby={
              hasError ? `${selectId}-error` : this.hint ? `${selectId}-hint` : null
            }
            onChange={this.handleChange}
            onBlur={() => this.ccBlur.emit()}
            onFocus={() => this.ccFocus.emit()}
          >
            {!hasOptions ? (
              <option value="" disabled selected>
                No options available
              </option>
            ) : (
              [
                this.placeholder && (
                  <option value="" disabled selected={!this.value}>
                    {this.placeholder}
                  </option>
                ),
                ...this.options.map((opt) => (
                  <option
                    value={opt.value}
                    disabled={opt.disabled}
                    selected={opt.value === this.value}
                  >
                    {opt.label}
                  </option>
                )),
              ]
            )}
          </select>

          <span class="cc-select__chevron" aria-hidden="true">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {hasError && (
          <span
            id={`${selectId}-error`}
            class="cc-select__message cc-select__message--error"
            role="alert"
          >
            {this.error}
          </span>
        )}
        {!hasError && this.hint && (
          <span id={`${selectId}-hint`} class="cc-select__message cc-select__message--hint">
            {this.hint}
          </span>
        )}
      </Host>
    );
  }
}

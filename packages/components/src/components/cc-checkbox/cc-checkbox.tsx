import { Component, Host, Prop, State, Event, EventEmitter, h } from '@stencil/core';

/**
 * @slot - Label text for the checkbox
 */
@Component({
  tag: 'cc-checkbox',
  styleUrl: 'cc-checkbox.scss',
  shadow: true,
})
export class CcCheckbox {
  /** Whether the checkbox is checked */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /** Indeterminate state — visually shows a dash, checked is ignored */
  @Prop({ mutable: true }) indeterminate: boolean = false;

  /** Disables the checkbox */
  @Prop() disabled: boolean = false;

  /** Marks the checkbox as required */
  @Prop() required: boolean = false;

  /** Associates checkbox with a form */
  @Prop() name: string = '';

  /** Value submitted with the form */
  @Prop() value: string = '';

  /** Helper text displayed below the checkbox */
  @Prop() hint: string = '';

  /** Error message — also puts the checkbox in an error state */
  @Prop() error: string = '';

  /** Emitted when the checked state changes */
  @Event() ccChange!: EventEmitter<boolean>;

  @State() private inputId = `cc-checkbox-${Math.random().toString(36).slice(2, 9)}`;

  private inputEl?: HTMLInputElement;

  componentDidLoad() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.indeterminate;
    }
  }

  componentDidUpdate() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.indeterminate;
    }
  }

  private handleChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    this.ccChange.emit(this.checked);
  };

  render() {
    const hasError = !!this.error;

    return (
      <Host>
        <label
          class={{
            'cc-checkbox': true,
            'cc-checkbox--disabled': this.disabled,
            'cc-checkbox--error': hasError,
          }}
          htmlFor={this.inputId}
        >
          <span class="cc-checkbox__control-wrapper">
            <input
              ref={(el) => (this.inputEl = el)}
              id={this.inputId}
              class="cc-checkbox__input"
              type="checkbox"
              checked={this.checked}
              disabled={this.disabled}
              required={this.required}
              name={this.name}
              value={this.value}
              aria-invalid={hasError ? 'true' : null}
              aria-describedby={
                hasError ? `${this.inputId}-error` : this.hint ? `${this.inputId}-hint` : null
              }
              onChange={this.handleChange}
            />
            <span class="cc-checkbox__control" aria-hidden="true">
              {this.indeterminate ? (
                <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor">
                  <rect width="10" height="2" rx="1" />
                </svg>
              ) : (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="1 4 3.5 6.5 9 1" />
                </svg>
              )}
            </span>
          </span>

          <span class="cc-checkbox__label-text">
            <slot />
            {this.required && (
              <span class="cc-checkbox__required" aria-hidden="true">
                {' '}
                *
              </span>
            )}
          </span>
        </label>

        {hasError && (
          <span
            id={`${this.inputId}-error`}
            class="cc-checkbox__message cc-checkbox__message--error"
            role="alert"
          >
            {this.error}
          </span>
        )}
        {!hasError && this.hint && (
          <span id={`${this.inputId}-hint`} class="cc-checkbox__message cc-checkbox__message--hint">
            {this.hint}
          </span>
        )}
      </Host>
    );
  }
}

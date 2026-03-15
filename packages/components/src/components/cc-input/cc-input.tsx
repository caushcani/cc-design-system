import { Component, Host, Prop, Event, EventEmitter, h } from '@stencil/core';

/**
 * @slot prefix - Icon or content to render inside the input on the left
 * @slot suffix - Icon or content to render inside the input on the right
 */
@Component({
  tag: 'cc-input',
  styleUrl: 'cc-input.scss',
  shadow: true,
})
export class CcInput {
  /** Input type */
  @Prop() type: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel' | 'number' = 'text';

  /** Bound value */
  @Prop({ mutable: true, reflect: false }) value: string = '';

  /** Placeholder text */
  @Prop() placeholder: string = '';

  /** Label displayed above the input */
  @Prop() label: string = '';

  /** Helper text displayed below the input */
  @Prop() hint: string = '';

  /** Error message — also puts the input in an error state */
  @Prop() error: string = '';

  /** Size variant */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** Disables the input */
  @Prop() disabled: boolean = false;

  /** Makes the input read-only */
  @Prop() readonly: boolean = false;

  /** Marks the input as required */
  @Prop() required: boolean = false;

  /** Associates input with a form element id */
  @Prop() name: string = '';

  /** Emitted on every input event with the current value */
  @Event() ccInput!: EventEmitter<string>;

  /** Emitted when the input loses focus */
  @Event() ccBlur!: EventEmitter<void>;

  /** Emitted when the input gains focus */
  @Event() ccFocus!: EventEmitter<void>;

  private handleInput = (e: Event) => {
    this.value = (e.target as HTMLInputElement).value;
    this.ccInput.emit(this.value);
  };

  render() {
    const hasError = !!this.error;
    const inputId = this.name || 'cc-input';

    return (
      <Host>
        {this.label && (
          <label class="cc-input__label" htmlFor={inputId}>
            {this.label}
            {this.required && (
              <span class="cc-input__required" aria-hidden="true">
                {' '}
                *
              </span>
            )}
          </label>
        )}
        <div
          class={{
            'cc-input__wrapper': true,
            [`cc-input__wrapper--${this.size}`]: true,
            'cc-input__wrapper--error': hasError,
            'cc-input__wrapper--disabled': this.disabled,
          }}
        >
          <slot name="prefix" />
          <input
            id={inputId}
            class="cc-input__field"
            type={this.type}
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readOnly={this.readonly}
            required={this.required}
            name={this.name}
            aria-invalid={hasError ? 'true' : null}
            aria-describedby={hasError ? `${inputId}-error` : this.hint ? `${inputId}-hint` : null}
            onInput={this.handleInput}
            onBlur={() => this.ccBlur.emit()}
            onFocus={() => this.ccFocus.emit()}
          />
          <slot name="suffix" />
        </div>
        {hasError && (
          <span
            id={`${inputId}-error`}
            class="cc-input__message cc-input__message--error"
            role="alert"
          >
            {this.error}
          </span>
        )}
        {!hasError && this.hint && (
          <span id={`${inputId}-hint`} class="cc-input__message cc-input__message--hint">
            {this.hint}
          </span>
        )}
      </Host>
    );
  }
}

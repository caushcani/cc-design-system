import {
  Component,
  Host,
  Prop,
  Event,
  EventEmitter,
  Element,
  Listen,
  Watch,
  h,
} from '@stencil/core';

@Component({
  tag: 'cc-radio-group',
  styleUrl: 'cc-radio-group.scss',
  shadow: true,
})
export class CcRadioGroup {
  @Element() el!: HTMLElement;

  /** Group name passed down to each cc-radio */
  @Prop() name: string = '';

  /** Currently selected value */
  @Prop({ mutable: true }) value: string = '';

  /** Label for the group */
  @Prop() label: string = '';

  /** Disables all radios in the group */
  @Prop() disabled: boolean = false;

  /** Marks the group as required */
  @Prop() required: boolean = false;

  /** Helper text displayed below the group */
  @Prop() hint: string = '';

  /** Error message — also puts the group in an error state */
  @Prop() error: string = '';

  /** Emitted when the selected value changes */
  @Event() ccChange!: EventEmitter<string>;

  componentDidLoad() {
    this.syncRadios();
  }

  @Watch('value')
  @Watch('disabled')
  @Watch('name')
  syncRadios() {
    const radios = Array.from(this.el.querySelectorAll('cc-radio')) as any[];
    radios.forEach((radio) => {
      radio.name = this.name;
      radio.checked = radio.value === this.value;
      if (this.disabled) radio.disabled = true;
    });
  }

  @Listen('ccRadioChange')
  handleRadioChange(event: CustomEvent<string>) {
    this.value = event.detail;
    this.ccChange.emit(this.value);
    this.syncRadios();
  }

  render() {
    const hasError = !!this.error;
    const groupId = this.name || 'cc-radio-group';

    return (
      <Host>
        <fieldset
          class={{
            'cc-radio-group': true,
            'cc-radio-group--error': hasError,
            'cc-radio-group--disabled': this.disabled,
          }}
          disabled={this.disabled}
          aria-describedby={hasError ? `${groupId}-error` : this.hint ? `${groupId}-hint` : null}
        >
          {this.label && (
            <legend class="cc-radio-group__legend">
              {this.label}
              {this.required && (
                <span class="cc-radio-group__required" aria-hidden="true">
                  {' '}
                  *
                </span>
              )}
            </legend>
          )}

          <div class="cc-radio-group__options">
            <slot />
          </div>

          {hasError && (
            <span
              id={`${groupId}-error`}
              class="cc-radio-group__message cc-radio-group__message--error"
              role="alert"
            >
              {this.error}
            </span>
          )}
          {!hasError && this.hint && (
            <span
              id={`${groupId}-hint`}
              class="cc-radio-group__message cc-radio-group__message--hint"
            >
              {this.hint}
            </span>
          )}
        </fieldset>
      </Host>
    );
  }
}

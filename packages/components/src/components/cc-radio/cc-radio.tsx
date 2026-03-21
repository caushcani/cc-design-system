import { Component, Host, Prop, Event, EventEmitter, State, h } from '@stencil/core';

@Component({
  tag: 'cc-radio',
  styleUrl: 'cc-radio.scss',
  shadow: true,
})
export class CcRadio {
  /** Value of this radio option */
  @Prop() value: string = '';

  /** Label text */
  @Prop() label: string = '';

  /** Whether this radio is selected — managed by cc-radio-group */
  @Prop({ mutable: true }) checked: boolean = false;

  /** Disables this radio */
  @Prop({ mutable: true }) disabled: boolean = false;

  /** Name attribute — set automatically by cc-radio-group */
  @Prop({ mutable: true }) name: string = '';

  /** Emitted when this radio is selected */
  @Event() ccRadioChange!: EventEmitter<string>;

  @State() private inputId = `cc-radio-${Math.random().toString(36).slice(2, 9)}`;

  private handleChange = () => {
    if (!this.disabled) {
      this.ccRadioChange.emit(this.value);
    }
  };

  render() {
    return (
      <Host>
        <label
          class={{
            'cc-radio': true,
            'cc-radio--disabled': this.disabled,
            'cc-radio--checked': this.checked,
          }}
          htmlFor={this.inputId}
        >
          <span class="cc-radio__control-wrapper">
            <input
              id={this.inputId}
              class="cc-radio__input"
              type="radio"
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              name={this.name}
              onChange={this.handleChange}
            />
            <span class="cc-radio__control" aria-hidden="true">
              <span class="cc-radio__dot" />
            </span>
          </span>
          {this.label && <span class="cc-radio__label-text">{this.label}</span>}
        </label>
      </Host>
    );
  }
}

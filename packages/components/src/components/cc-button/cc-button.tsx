import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @slot - Default slot for button label text
 * @slot prefix - Content to render before the label (e.g. icon)
 * @slot suffix - Content to render after the label (e.g. icon)
 */
@Component({
  tag: 'cc-button',
  styleUrl: 'cc-button.scss',
  shadow: true,
})
export class CcButton {
  /** Visual style of the button */
  @Prop() variant: 'solid' | 'outline' | 'ghost' = 'solid';

  /** Size of the button */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** Disables the button and prevents interaction */
  @Prop() disabled: boolean = false;

  /** HTML button type attribute */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  render() {
    return (
      <Host>
        <button
          class={{
            'cc-button': true,
            [`cc-button--${this.variant}`]: true,
            [`cc-button--${this.size}`]: true,
          }}
          disabled={this.disabled}
          type={this.type}
          aria-disabled={this.disabled ? 'true' : null}
        >
          <slot name="prefix" />
          <slot />
          <slot name="suffix" />
        </button>
      </Host>
    );
  }
}

import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @slot - Main body content
 * @slot header - Card header (title, actions)
 * @slot footer - Card footer (actions, metadata)
 * @slot media - Full-bleed image or media at the top of the card
 */
@Component({
  tag: 'cc-card',
  styleUrl: 'cc-card.scss',
  shadow: true,
})
export class CcCard {
  /** Visual style of the card */
  @Prop() variant: 'elevated' | 'outlined' | 'flat' = 'elevated';

  /** Internal padding size */
  @Prop() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  /** Makes the card interactive (hover + focus styles) */
  @Prop() clickable: boolean = false;

  render() {
    return (
      <Host>
        <div
          class={{
            'cc-card': true,
            [`cc-card--${this.variant}`]: true,
            [`cc-card--padding-${this.padding}`]: true,
            'cc-card--clickable': this.clickable,
          }}
          tabindex={this.clickable ? 0 : undefined}
          role={this.clickable ? 'button' : undefined}
        >
          <slot name="media" />

          <div class="cc-card__inner">
            <slot name="header" />
            <div class="cc-card__body">
              <slot />
            </div>
            <slot name="footer" />
          </div>
        </div>
      </Host>
    );
  }
}

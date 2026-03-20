import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @slot - Badge label text
 */
@Component({
  tag: 'cc-badge',
  styleUrl: 'cc-badge.scss',
  shadow: true,
})
export class CcBadge {
  /** Visual variant */
  @Prop() variant: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';

  /** Size of the badge */
  @Prop() size: 'sm' | 'md' = 'md';

  /** Pill shape (fully rounded) vs subtle rounded corners */
  @Prop() pill: boolean = false;

  /** Soft tinted style vs solid filled */
  @Prop() soft: boolean = true;

  render() {
    return (
      <Host>
        <span
          class={{
            'cc-badge': true,
            [`cc-badge--${this.variant}`]: true,
            [`cc-badge--${this.size}`]: true,
            'cc-badge--pill': this.pill,
            'cc-badge--solid': !this.soft,
          }}
        >
          <slot />
        </span>
      </Host>
    );
  }
}

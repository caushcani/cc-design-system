import { Component, Host, Prop, State, Event, EventEmitter, h } from '@stencil/core';

const ICONS: Record<string, string> = {
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  success: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  danger: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
};

/**
 * @slot - Alert body / description text
 * @slot icon - Custom icon (overrides built-in icon)
 */
@Component({
  tag: 'cc-alert',
  styleUrl: 'cc-alert.scss',
  shadow: true,
})
export class CcAlert {
  /** Visual variant */
  @Prop() variant: 'info' | 'success' | 'warning' | 'danger' = 'info';

  /** Bold title text displayed above the body */
  @Prop() heading: string = '';

  /** Show a dismiss (×) button */
  @Prop() dismissible: boolean = false;

  /** Hide the built-in icon */
  @Prop() hideIcon: boolean = false;

  /** Emitted when the dismiss button is clicked */
  @Event() ccDismiss!: EventEmitter<void>;

  @State() private dismissed = false;

  private handleDismiss = () => {
    this.dismissed = true;
    this.ccDismiss.emit();
  };

  render() {
    if (this.dismissed) return null;

    return (
      <Host role="alert">
        <div
          class={{
            'cc-alert': true,
            [`cc-alert--${this.variant}`]: true,
          }}
        >
          {!this.hideIcon && (
            <span class="cc-alert__icon" aria-hidden="true" innerHTML={ICONS[this.variant]} />
          )}

          <div class="cc-alert__content">
            {this.heading && <p class="cc-alert__heading">{this.heading}</p>}
            <div class="cc-alert__body">
              <slot />
            </div>
          </div>

          {this.dismissible && (
            <button class="cc-alert__close" aria-label="Dismiss" onClick={this.handleDismiss}>
              ×
            </button>
          )}
        </div>
      </Host>
    );
  }
}

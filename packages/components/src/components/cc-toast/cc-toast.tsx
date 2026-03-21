import { Component, Host, Prop, Event, EventEmitter, State, h } from '@stencil/core';

const ICONS: Record<string, string> = {
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  success: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  danger: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
};

@Component({
  tag: 'cc-toast',
  styleUrl: 'cc-toast.scss',
  shadow: true,
})
export class CcToast {
  /** Visual variant */
  @Prop() variant: 'info' | 'success' | 'warning' | 'danger' = 'info';

  /** Main message text */
  @Prop() message: string = '';

  /** Optional bold title above the message */
  @Prop() title: string = '';

  /** Show dismiss (×) button */
  @Prop() dismissible: boolean = true;

  /**
   * Auto-dismiss after this many milliseconds.
   * Set to 0 to disable auto-dismiss.
   */
  @Prop() duration: number = 4000;

  /** Emitted when the toast is dismissed (button click or auto-dismiss) */
  @Event() ccClose!: EventEmitter<void>;

  @State() private visible = false;
  @State() private hiding = false;

  private timer?: ReturnType<typeof setTimeout>;

  componentDidLoad() {
    // Trigger enter animation on next frame
    requestAnimationFrame(() => {
      this.visible = true;
    });

    if (this.duration > 0) {
      this.timer = setTimeout(() => this.dismiss(), this.duration);
    }
  }

  disconnectedCallback() {
    clearTimeout(this.timer);
  }

  private dismiss = () => {
    clearTimeout(this.timer);
    this.hiding = true;

    // Wait for exit animation before emitting
    setTimeout(() => {
      this.ccClose.emit();
    }, 250);
  };

  render() {
    return (
      <Host>
        <div
          class={{
            'cc-toast': true,
            [`cc-toast--${this.variant}`]: true,
            'cc-toast--visible': this.visible,
            'cc-toast--hiding': this.hiding,
          }}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span class="cc-toast__icon" aria-hidden="true" innerHTML={ICONS[this.variant]} />

          <div class="cc-toast__content">
            {this.title && <p class="cc-toast__title">{this.title}</p>}
            {this.message && <p class="cc-toast__message">{this.message}</p>}
          </div>

          {this.dismissible && (
            <button class="cc-toast__close" aria-label="Dismiss" onClick={this.dismiss}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </Host>
    );
  }
}

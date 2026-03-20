import { Component, Host, Prop, Event, EventEmitter, Method, Watch, h } from '@stencil/core';

/**
 * @slot - Default slot for the modal body content
 * @slot header - Custom header content (replaces the heading prop)
 * @slot footer - Action buttons or footer content
 */
@Component({
  tag: 'cc-modal',
  styleUrl: 'cc-modal.scss',
  shadow: true,
})
export class CcModal {
  /** Controls whether the modal is visible */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /** Heading text displayed in the modal header */
  @Prop() heading: string = '';

  /** Size of the modal dialog */
  @Prop() size: 'sm' | 'md' | 'lg' | 'full' = 'md';

  /** Hides the close (×) button in the header */
  @Prop() hideClose: boolean = false;

  /** Prevents closing when clicking the backdrop */
  @Prop() staticBackdrop: boolean = false;

  /** Emitted when the modal requests to be closed */
  @Event() ccClose!: EventEmitter<void>;

  /** Opens the modal */
  @Method()
  async show() {
    this.open = true;
  }

  /** Closes the modal */
  @Method()
  async hide() {
    this.close();
  }

  @Watch('open')
  handleOpenChange(isOpen: boolean) {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  private close() {
    this.open = false;
    this.ccClose.emit();
  }

  private handleBackdropClick = () => {
    if (!this.staticBackdrop) {
      this.close();
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) {
      this.close();
    }
  };

  connectedCallback() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = '';
  }

  render() {
    return (
      <Host aria-hidden={!this.open ? 'true' : null}>
        <div
          class={{ 'cc-modal__overlay': true, 'cc-modal__overlay--visible': this.open }}
          onClick={this.handleBackdropClick}
        >
          <div
            class={{
              'cc-modal__dialog': true,
              [`cc-modal__dialog--${this.size}`]: true,
              'cc-modal__dialog--visible': this.open,
            }}
            role="dialog"
            aria-modal="true"
            aria-label={this.heading || undefined}
            onClick={(e) => e.stopPropagation()}
          >
            <div class="cc-modal__header">
              <slot name="header">
                {this.heading && <h2 class="cc-modal__heading">{this.heading}</h2>}
              </slot>
              {!this.hideClose && (
                <button
                  class="cc-modal__close"
                  aria-label="Close modal"
                  onClick={() => this.close()}
                >
                  ×
                </button>
              )}
            </div>

            <div class="cc-modal__body">
              <slot />
            </div>

            <div class="cc-modal__footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

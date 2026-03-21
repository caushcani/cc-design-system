import { Component, Host, Prop, State, Method, h } from '@stencil/core';

export interface ToastOptions {
  message: string;
  title?: string;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  duration?: number;
  dismissible?: boolean;
}

interface ToastEntry extends ToastOptions {
  id: string;
}

@Component({
  tag: 'cc-toaster',
  styleUrl: 'cc-toaster.scss',
  shadow: true,
})
export class CcToaster {
  /** Where toasts appear on screen */
  @Prop() position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right' = 'bottom-right';

  @State() private toasts: ToastEntry[] = [];

  /** Add a new toast. Returns its generated id. */
  @Method()
  async show(options: ToastOptions): Promise<string> {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    this.toasts = [
      ...this.toasts,
      { id, variant: 'info', duration: 4000, dismissible: true, ...options },
    ];
    return id;
  }

  /** Dismiss a toast by id. */
  @Method()
  async dismiss(id: string): Promise<void> {
    this.removeToast(id);
  }

  private removeToast(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }

  render() {
    const isTop = this.position.startsWith('top');

    return (
      <Host>
        <div
          class={`cc-toaster cc-toaster--${this.position}`}
          aria-live="polite"
          aria-relevant="additions"
        >
          {(isTop ? [...this.toasts].reverse() : this.toasts).map((toast) => (
            <cc-toast
              key={toast.id}
              variant={toast.variant}
              message={toast.message}
              title={toast.title}
              duration={toast.duration}
              dismissible={toast.dismissible}
              onCcClose={() => this.removeToast(toast.id)}
            />
          ))}
        </div>
      </Host>
    );
  }
}

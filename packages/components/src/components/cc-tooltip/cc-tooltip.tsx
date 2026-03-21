import { Component, Host, Prop, State, Element, h } from '@stencil/core';

@Component({
  tag: 'cc-tooltip',
  styleUrl: 'cc-tooltip.scss',
  shadow: true,
})
export class CcTooltip {
  @Element() el!: HTMLElement;

  /** Text content of the tooltip */
  @Prop() content: string = '';

  /** Preferred placement relative to the trigger */
  @Prop() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /** Disables the tooltip */
  @Prop() disabled: boolean = false;

  @State() private visible = false;

  private tooltipId = `cc-tooltip-${Math.random().toString(36).slice(2, 9)}`;
  private hideTimer?: ReturnType<typeof setTimeout>;

  disconnectedCallback() {
    clearTimeout(this.hideTimer);
  }

  private show = () => {
    clearTimeout(this.hideTimer);
    if (!this.disabled && this.content) {
      this.visible = true;
    }
  };

  private hide = () => {
    // Small delay prevents flicker when moving between trigger and tooltip
    this.hideTimer = setTimeout(() => {
      this.visible = false;
    }, 80);
  };

  render() {
    return (
      <Host>
        <span
          class="cc-tooltip__trigger"
          onMouseEnter={this.show}
          onMouseLeave={this.hide}
          onFocus={this.show}
          onBlur={this.hide}
          aria-describedby={this.visible ? this.tooltipId : undefined}
        >
          <slot />
        </span>

        <div
          id={this.tooltipId}
          role="tooltip"
          aria-hidden={this.visible ? undefined : 'true'}
          class={{
            'cc-tooltip': true,
            [`cc-tooltip--${this.placement}`]: true,
            'cc-tooltip--visible': this.visible,
          }}
        >
          {this.content}
          <span class="cc-tooltip__arrow" aria-hidden="true" />
        </div>
      </Host>
    );
  }
}

import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @slot - Panel content
 */
@Component({
  tag: 'cc-tab-panel',
  styleUrl: 'cc-tab-panel.scss',
  shadow: true,
})
export class CcTabPanel {
  /** Must match the value of its corresponding cc-tab */
  @Prop() value: string = '';

  /** Set by cc-tabs — whether this panel is visible */
  @Prop({ mutable: true }) active: boolean = false;

  render() {
    return (
      <Host role="tabpanel" hidden={!this.active}>
        <div class="cc-tab-panel">
          <slot />
        </div>
      </Host>
    );
  }
}

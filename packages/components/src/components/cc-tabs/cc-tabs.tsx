import {
  Component,
  Host,
  Prop,
  Event,
  EventEmitter,
  Element,
  Listen,
  Watch,
  h,
} from '@stencil/core';

@Component({
  tag: 'cc-tabs',
  styleUrl: 'cc-tabs.scss',
  shadow: true,
})
export class CcTabs {
  @Element() el!: HTMLElement;

  /** The value of the currently active tab */
  @Prop({ mutable: true }) value: string = '';

  /** Visual style of the tab list */
  @Prop() variant: 'line' | 'pills' = 'line';

  /** Emitted when the active tab changes */
  @Event() ccChange!: EventEmitter<string>;

  componentDidLoad() {
    // If no value set, activate the first enabled tab
    if (!this.value) {
      const firstTab = Array.from(this.el.querySelectorAll('cc-tab')).find(
        (t: any) => !t.disabled,
      ) as any;
      if (firstTab) {
        this.value = firstTab.value;
      }
    }
    this.syncChildren();
  }

  @Watch('value')
  syncChildren() {
    const tabs = Array.from(this.el.querySelectorAll('cc-tab')) as any[];
    const panels = Array.from(this.el.querySelectorAll('cc-tab-panel')) as any[];

    tabs.forEach((tab) => {
      tab.active = tab.value === this.value;
    });

    panels.forEach((panel) => {
      panel.active = panel.value === this.value;
    });
  }

  @Listen('ccTabSelect')
  handleTabSelect(event: CustomEvent<string>) {
    this.value = event.detail;
    this.ccChange.emit(this.value);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const tabs = Array.from(this.el.querySelectorAll('cc-tab:not([disabled])')) as any[];
    const currentIndex = tabs.findIndex((t) => t.value === this.value);

    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== currentIndex) {
      this.value = tabs[nextIndex].value;
      this.ccChange.emit(this.value);
    }
  };

  render() {
    return (
      <Host>
        <div
          class={{
            'cc-tabs': true,
            [`cc-tabs--${this.variant}`]: true,
          }}
        >
          <div class="cc-tabs__tablist" role="tablist" onKeyDown={this.handleKeyDown}>
            <slot name="tabs" />
          </div>

          <div class="cc-tabs__panels">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}

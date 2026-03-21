import { Component, Host, Prop, Event, EventEmitter, State, h } from '@stencil/core';

/**
 * @slot - Tab label content
 */
@Component({
  tag: 'cc-tab',
  styleUrl: 'cc-tab.scss',
  shadow: true,
})
export class CcTab {
  /** Unique value matching a cc-tab-panel */
  @Prop() value: string = '';

  /** Disables this tab */
  @Prop({ mutable: true }) disabled: boolean = false;

  /** Set by cc-tabs — whether this tab is active */
  @Prop({ mutable: true }) active: boolean = false;

  /** Emitted when the tab is clicked */
  @Event() ccTabSelect!: EventEmitter<string>;

  @State() private inputId = `cc-tab-${Math.random().toString(36).slice(2, 9)}`;

  private handleClick = () => {
    if (!this.disabled && !this.active) {
      this.ccTabSelect.emit(this.value);
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !this.disabled) {
      e.preventDefault();
      this.ccTabSelect.emit(this.value);
    }
  };

  render() {
    return (
      <Host
        role="tab"
        aria-selected={this.active ? 'true' : 'false'}
        aria-disabled={this.disabled ? 'true' : null}
      >
        <button
          id={this.inputId}
          class={{
            'cc-tab': true,
            'cc-tab--active': this.active,
            'cc-tab--disabled': this.disabled,
          }}
          tabindex={this.active ? 0 : -1}
          disabled={this.disabled}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          <slot />
        </button>
      </Host>
    );
  }
}

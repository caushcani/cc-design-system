import type { Meta, StoryObj } from '@storybook/html';

type TabsArgs = {
  variant: 'line' | 'pills';
  value: string;
};

const meta: Meta<TabsArgs> = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'pills'],
      description: 'Visual style of the tab list',
      table: { defaultValue: { summary: 'line' } },
    },
    value: {
      control: 'text',
      description: 'Active tab value',
    },
  },
  args: {
    variant: 'line',
    value: 'overview',
  },
};

export default meta;
type Story = StoryObj<TabsArgs>;

const render = (args: TabsArgs) => `
  <cc-tabs variant="${args.variant}" value="${args.value}" style="max-width: 560px;">
    <cc-tab slot="tabs" value="overview">Overview</cc-tab>
    <cc-tab slot="tabs" value="settings">Settings</cc-tab>
    <cc-tab slot="tabs" value="billing">Billing</cc-tab>
    <cc-tab slot="tabs" value="disabled" disabled>Disabled</cc-tab>

    <cc-tab-panel value="overview">
      <p style="margin: 0; color: #4b5563;">
        This is the <strong>Overview</strong> panel. Use this section to present a summary of the content.
      </p>
    </cc-tab-panel>
    <cc-tab-panel value="settings">
      <p style="margin: 0; color: #4b5563;">
        This is the <strong>Settings</strong> panel. Configure your preferences here.
      </p>
    </cc-tab-panel>
    <cc-tab-panel value="billing">
      <p style="margin: 0; color: #4b5563;">
        This is the <strong>Billing</strong> panel. Manage your subscription and payment methods.
      </p>
    </cc-tab-panel>
    <cc-tab-panel value="disabled">
      <p style="margin: 0; color: #4b5563;">This panel is never shown.</p>
    </cc-tab-panel>
  </cc-tabs>
`;

export const Default: Story = { render };

export const Pills: Story = {
  name: 'Pills Variant',
  args: { variant: 'pills' },
  render,
};

export const DefaultActive: Story = {
  name: 'Pre-selected Tab',
  args: { value: 'billing' },
  render,
};

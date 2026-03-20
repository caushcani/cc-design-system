import type { Meta, StoryObj } from '@storybook/html';

type BadgeArgs = {
  variant: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  size: 'sm' | 'md';
  pill: boolean;
  soft: boolean;
  label: string;
};

const meta: Meta<BadgeArgs> = {
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'neutral'],
      description: 'Visual variant',
      table: { defaultValue: { summary: 'neutral' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the badge',
      table: { defaultValue: { summary: 'md' } },
    },
    pill: {
      control: 'boolean',
      description: 'Fully rounded pill shape',
      table: { defaultValue: { summary: 'false' } },
    },
    soft: {
      control: 'boolean',
      description: 'Soft tinted style (false = solid filled)',
      table: { defaultValue: { summary: 'true' } },
    },
    label: { control: 'text', description: 'Badge text content' },
  },
  args: {
    variant: 'neutral',
    size: 'md',
    pill: false,
    soft: true,
    label: 'Badge',
  },
};

export default meta;
type Story = StoryObj<BadgeArgs>;

const render = (args: BadgeArgs) =>
  `<cc-badge
    variant="${args.variant}"
    size="${args.size}"
    ${args.pill ? 'pill' : ''}
    ${args.soft ? '' : 'soft="false"'}
  >${args.label}</cc-badge>`;

export const Default: Story = { render };

export const Variants: Story = {
  name: 'All Variants',
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <cc-badge variant="primary">Primary</cc-badge>
      <cc-badge variant="success">Success</cc-badge>
      <cc-badge variant="warning">Warning</cc-badge>
      <cc-badge variant="danger">Danger</cc-badge>
      <cc-badge variant="neutral">Neutral</cc-badge>
    </div>
  `,
};

export const Solid: Story = {
  name: 'Solid Variants',
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <cc-badge variant="primary" soft="false">Primary</cc-badge>
      <cc-badge variant="success" soft="false">Success</cc-badge>
      <cc-badge variant="warning" soft="false">Warning</cc-badge>
      <cc-badge variant="danger" soft="false">Danger</cc-badge>
      <cc-badge variant="neutral" soft="false">Neutral</cc-badge>
    </div>
  `,
};

export const Pill: Story = {
  name: 'Pill Shape',
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <cc-badge variant="primary" pill>Primary</cc-badge>
      <cc-badge variant="success" pill>Success</cc-badge>
      <cc-badge variant="warning" pill>Warning</cc-badge>
      <cc-badge variant="danger" pill>Danger</cc-badge>
      <cc-badge variant="neutral" pill>Neutral</cc-badge>
    </div>
  `,
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => `
    <div style="display: flex; gap: 8px; align-items: center;">
      <cc-badge variant="primary" size="sm">Small</cc-badge>
      <cc-badge variant="primary" size="md">Medium</cc-badge>
    </div>
  `,
};

export const InContext: Story = {
  name: 'In Context',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 16px; font-family: Inter, sans-serif;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 14px; color: #374151;">Order status</span>
        <cc-badge variant="success" pill>Shipped</cc-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 14px; color: #374151;">Payment</span>
        <cc-badge variant="warning" pill>Pending</cc-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 14px; color: #374151;">Account</span>
        <cc-badge variant="danger" pill>Suspended</cc-badge>
      </div>
    </div>
  `,
};

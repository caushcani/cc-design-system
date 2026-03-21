import type { Meta, StoryObj } from '@storybook/html';

type TooltipArgs = {
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
  disabled: boolean;
};

const meta: Meta<TooltipArgs> = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip text content',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Preferred placement relative to the trigger',
      table: { defaultValue: { summary: 'top' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the tooltip',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    content: 'This is a tooltip',
    placement: 'top',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<TooltipArgs>;

const centered = (inner: string) =>
  `<div style="display: flex; align-items: center; justify-content: center; height: 160px;">${inner}</div>`;

const render = (args: TooltipArgs) =>
  centered(`
    <cc-tooltip
      content="${args.content}"
      placement="${args.placement}"
      ${args.disabled ? 'disabled' : ''}
    >
      <cc-button variant="outline" size="md">Hover me</cc-button>
    </cc-tooltip>
  `);

export const Default: Story = { render };

export const AllPlacements: Story = {
  name: 'All Placements',
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 48px; place-items: center;">
      <div></div>
      <cc-tooltip content="Top tooltip" placement="top">
        <cc-button variant="outline" size="sm">Top</cc-button>
      </cc-tooltip>
      <div></div>

      <cc-tooltip content="Left tooltip" placement="left">
        <cc-button variant="outline" size="sm">Left</cc-button>
      </cc-tooltip>
      <div></div>
      <cc-tooltip content="Right tooltip" placement="right">
        <cc-button variant="outline" size="sm">Right</cc-button>
      </cc-tooltip>

      <div></div>
      <cc-tooltip content="Bottom tooltip" placement="bottom">
        <cc-button variant="outline" size="sm">Bottom</cc-button>
      </cc-tooltip>
      <div></div>
    </div>
  `,
};

export const OnIconButton: Story = {
  name: 'On Icon',
  render: () =>
    centered(`
      <cc-tooltip content="Delete item" placement="top">
        <button style="background: none; border: 1px solid #d1d5db; border-radius: 6px; padding: 6px 10px; cursor: pointer; font-size: 16px;" aria-label="Delete">
          🗑️
        </button>
      </cc-tooltip>
    `),
};

export const LongerContent: Story = {
  name: 'Longer Content',
  render: () =>
    centered(`
      <cc-tooltip content="This action cannot be undone once confirmed" placement="bottom">
        <cc-button variant="solid" size="md">Delete account</cc-button>
      </cc-tooltip>
    `),
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  render,
};

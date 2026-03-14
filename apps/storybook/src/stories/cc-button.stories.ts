import type { Meta, StoryObj } from '@storybook/html';

type ButtonArgs = {
  variant: 'solid' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  label: string;
};

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
      description: 'Visual style of the button',
      table: { defaultValue: { summary: 'solid' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Button label text',
    },
  },
  args: {
    variant: 'solid',
    size: 'md',
    disabled: false,
    label: 'Click me',
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

const render = (args: ButtonArgs) =>
  `<cc-button variant="${args.variant}" size="${args.size}" ${args.disabled ? 'disabled' : ''} type="button">${args.label}</cc-button>`;

export const Default: Story = { render };

export const Solid: Story = {
  args: { variant: 'solid', label: 'Solid button' },
  render,
};

export const Outline: Story = {
  args: { variant: 'outline', label: 'Outline button' },
  render,
};

export const Ghost: Story = {
  args: { variant: 'ghost', label: 'Ghost button' },
  render,
};

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => `
    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
      <cc-button size="sm">Small</cc-button>
      <cc-button size="md">Medium</cc-button>
      <cc-button size="lg">Large</cc-button>
    </div>
  `,
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => `
    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
      <cc-button variant="solid">Solid</cc-button>
      <cc-button variant="outline">Outline</cc-button>
      <cc-button variant="ghost">Ghost</cc-button>
    </div>
  `,
};

export const Disabled: Story = {
  name: 'Disabled State',
  render: () => `
    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
      <cc-button variant="solid" disabled>Solid</cc-button>
      <cc-button variant="outline" disabled>Outline</cc-button>
      <cc-button variant="ghost" disabled>Ghost</cc-button>
    </div>
  `,
};

export const WithSlots: Story = {
  name: 'With Prefix / Suffix Slots',
  render: () => `
    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
      <cc-button variant="solid">
        <span slot="prefix">←</span>
        Back
      </cc-button>
      <cc-button variant="outline">
        Next
        <span slot="suffix">→</span>
      </cc-button>
    </div>
  `,
};

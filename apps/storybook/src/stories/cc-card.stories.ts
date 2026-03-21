import type { Meta, StoryObj } from '@storybook/html';

type CardArgs = {
  variant: 'elevated' | 'outlined' | 'flat';
  padding: 'none' | 'sm' | 'md' | 'lg';
  clickable: boolean;
};

const meta: Meta<CardArgs> = {
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
      description: 'Visual style of the card',
      table: { defaultValue: { summary: 'elevated' } },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding size',
      table: { defaultValue: { summary: 'md' } },
    },
    clickable: {
      control: 'boolean',
      description: 'Adds hover/focus interactive styles',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    variant: 'elevated',
    padding: 'md',
    clickable: false,
  },
};

export default meta;
type Story = StoryObj<CardArgs>;

const render = (args: CardArgs) => `
  <cc-card
    variant="${args.variant}"
    padding="${args.padding}"
    ${args.clickable ? 'clickable' : ''}
    style="max-width: 360px;"
  >
    <div slot="header">
      <strong style="font-size: 16px; color: #111827;">Card Title</strong>
    </div>
    <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.5;">
      This is the card body. It can contain any content — text, images, form controls, or other components.
    </p>
    <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
      <cc-button variant="ghost" size="sm">Cancel</cc-button>
      <cc-button variant="solid" size="sm">Confirm</cc-button>
    </div>
  </cc-card>
`;

export const Default: Story = { render };

export const Outlined: Story = {
  name: 'Outlined',
  args: { variant: 'outlined' },
  render,
};

export const Flat: Story = {
  name: 'Flat',
  args: { variant: 'flat' },
  render,
};

export const Clickable: Story = {
  name: 'Clickable',
  args: { clickable: true },
  render,
};

export const WithMedia: Story = {
  name: 'With Media',
  render: () => `
    <cc-card variant="outlined" style="max-width: 360px;">
      <img
        slot="media"
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=720&q=80"
        alt="Mountain landscape"
      />
      <div slot="header">
        <strong style="font-size: 16px; color: #111827;">Mountain View</strong>
      </div>
      <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.5;">
        A breathtaking view of the alpine peaks at sunrise.
      </p>
      <div slot="footer" style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: #9ca3af;">Photography</span>
        <cc-button variant="outline" size="sm">View more</cc-button>
      </div>
    </cc-card>
  `,
};

export const BodyOnly: Story = {
  name: 'Body Only',
  render: () => `
    <cc-card variant="outlined" style="max-width: 360px;">
      <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.5;">
        A simple card with only body content and no header or footer slots.
      </p>
    </cc-card>
  `,
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => `
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      ${(['elevated', 'outlined', 'flat'] as const)
        .map(
          (v) => `
        <cc-card variant="${v}" style="max-width: 200px; flex: 1;">
          <div slot="header">
            <strong style="font-size: 14px; color: #111827; text-transform: capitalize;">${v}</strong>
          </div>
          <p style="margin: 0; color: #4b5563; font-size: 13px;">Card variant: ${v}.</p>
        </cc-card>
      `,
        )
        .join('')}
    </div>
  `,
};

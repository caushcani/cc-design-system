import type { Meta, StoryObj } from '@storybook/html';

type ModalArgs = {
  open: boolean;
  heading: string;
  size: 'sm' | 'md' | 'lg' | 'full';
  hideClose: boolean;
  staticBackdrop: boolean;
};

const meta: Meta<ModalArgs> = {
  title: 'Components/Modal',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls modal visibility',
      table: { defaultValue: { summary: 'false' } },
    },
    heading: {
      control: 'text',
      description: 'Heading text in the modal header',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Width of the modal dialog',
      table: { defaultValue: { summary: 'md' } },
    },
    hideClose: {
      control: 'boolean',
      description: 'Hides the × close button',
      table: { defaultValue: { summary: 'false' } },
    },
    staticBackdrop: {
      control: 'boolean',
      description: 'Prevents closing on backdrop click',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    open: true,
    heading: 'Modal Title',
    size: 'md',
    hideClose: false,
    staticBackdrop: false,
  },
};

export default meta;
type Story = StoryObj<ModalArgs>;

const render = (args: ModalArgs) => `
  <cc-modal
    heading="${args.heading}"
    size="${args.size}"
    ${args.open ? 'open' : ''}
    ${args.hideClose ? 'hide-close' : ''}
    ${args.staticBackdrop ? 'static-backdrop' : ''}
  >
    <p>This is the modal body. You can put any content here.</p>
    <slot name="footer" slot="footer">
      <cc-button variant="ghost">Cancel</cc-button>
      <cc-button variant="solid">Confirm</cc-button>
    </slot>
  </cc-modal>
`;

export const Default: Story = { render };

export const Small: Story = {
  name: 'Small',
  args: { size: 'sm', heading: 'Confirm action' },
  render: (args) => `
    <cc-modal heading="${args.heading}" size="${args.size}" ${args.open ? 'open' : ''}>
      <p>Are you sure you want to continue?</p>
      <div slot="footer">
        <cc-button variant="ghost">Cancel</cc-button>
        <cc-button variant="solid">Yes, continue</cc-button>
      </div>
    </cc-modal>
  `,
};

export const Large: Story = {
  name: 'Large',
  args: { size: 'lg', heading: 'Edit profile' },
  render: (args) => `
    <cc-modal heading="${args.heading}" size="${args.size}" ${args.open ? 'open' : ''}>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <cc-input label="First name" placeholder="Jane"></cc-input>
        <cc-input label="Last name" placeholder="Doe"></cc-input>
        <cc-input label="Email" type="email" placeholder="jane@example.com"></cc-input>
      </div>
      <div slot="footer">
        <cc-button variant="ghost">Cancel</cc-button>
        <cc-button variant="solid">Save changes</cc-button>
      </div>
    </cc-modal>
  `,
};

export const NoFooter: Story = {
  name: 'No Footer',
  args: { heading: 'Info' },
  render: (args) => `
    <cc-modal heading="${args.heading}" ${args.open ? 'open' : ''}>
      <p>This modal has no footer actions.</p>
    </cc-modal>
  `,
};

export const StaticBackdrop: Story = {
  name: 'Static Backdrop',
  args: { heading: 'Required action', staticBackdrop: true },
  render,
};

import type { Meta, StoryObj } from '@storybook/html';

type AlertArgs = {
  variant: 'info' | 'success' | 'warning' | 'danger';
  heading: string;
  body: string;
  dismissible: boolean;
  hideIcon: boolean;
};

const meta: Meta<AlertArgs> = {
  title: 'Components/Alert',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Visual variant',
      table: { defaultValue: { summary: 'info' } },
    },
    heading: { control: 'text', description: 'Bold title above the body' },
    body: { control: 'text', description: 'Alert body text' },
    dismissible: {
      control: 'boolean',
      description: 'Shows a dismiss button',
      table: { defaultValue: { summary: 'false' } },
    },
    hideIcon: {
      control: 'boolean',
      description: 'Hides the built-in icon',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    variant: 'info',
    heading: '',
    body: 'This is an informational message.',
    dismissible: false,
    hideIcon: false,
  },
};

export default meta;
type Story = StoryObj<AlertArgs>;

const render = (args: AlertArgs) =>
  `<cc-alert
    variant="${args.variant}"
    heading="${args.heading}"
    ${args.dismissible ? 'dismissible' : ''}
    ${args.hideIcon ? 'hide-icon' : ''}
  >${args.body}</cc-alert>`;

export const Default: Story = { render };

export const Variants: Story = {
  name: 'All Variants',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 480px;">
      <cc-alert variant="info">Your session will expire in 10 minutes.</cc-alert>
      <cc-alert variant="success">Changes saved successfully.</cc-alert>
      <cc-alert variant="warning">Your plan is nearing its usage limit.</cc-alert>
      <cc-alert variant="danger">Failed to delete the record. Please try again.</cc-alert>
    </div>
  `,
};

export const WithHeading: Story = {
  name: 'With Heading',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 480px;">
      <cc-alert variant="info" heading="Heads up">Your account email has not been verified.</cc-alert>
      <cc-alert variant="success" heading="Payment received">We have sent a receipt to your email address.</cc-alert>
      <cc-alert variant="warning" heading="Storage almost full">You have used 90% of your storage quota.</cc-alert>
      <cc-alert variant="danger" heading="Action required">Your payment method has expired.</cc-alert>
    </div>
  `,
};

export const Dismissible: Story = {
  name: 'Dismissible',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 480px;">
      <cc-alert variant="info" heading="Update available" dismissible>
        A new version is ready. Refresh to apply changes.
      </cc-alert>
      <cc-alert variant="warning" dismissible>
        You are working in a staging environment.
      </cc-alert>
    </div>
  `,
};

export const NoIcon: Story = {
  name: 'Without Icon',
  args: { hideIcon: true, heading: 'Notice', body: 'This alert has no icon.' },
  render,
};

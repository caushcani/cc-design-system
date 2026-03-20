import type { Meta, StoryObj } from '@storybook/html';

type CheckboxArgs = {
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  required: boolean;
  hint: string;
  error: string;
  label: string;
};

const meta: Meta<CheckboxArgs> = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
      table: { defaultValue: { summary: 'false' } },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (shows a dash)',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks the checkbox as required',
      table: { defaultValue: { summary: 'false' } },
    },
    hint: { control: 'text', description: 'Helper text below the checkbox' },
    error: { control: 'text', description: 'Error message' },
    label: { control: 'text', description: 'Label text' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    hint: '',
    error: '',
    label: 'Accept terms and conditions',
  },
};

export default meta;
type Story = StoryObj<CheckboxArgs>;

const render = (args: CheckboxArgs) =>
  `<cc-checkbox
    ${args.checked ? 'checked' : ''}
    ${args.indeterminate ? 'indeterminate' : ''}
    ${args.disabled ? 'disabled' : ''}
    ${args.required ? 'required' : ''}
    hint="${args.hint}"
    error="${args.error}"
  >${args.label}</cc-checkbox>`;

export const Default: Story = { render };

export const Checked: Story = {
  name: 'Checked',
  args: { checked: true },
  render,
};

export const Indeterminate: Story = {
  name: 'Indeterminate',
  args: { indeterminate: true, label: 'Select all' },
  render,
};

export const WithHint: Story = {
  name: 'With Hint',
  args: { hint: 'You can change this later in settings.' },
  render,
};

export const WithError: Story = {
  name: 'Error State',
  args: { error: 'You must accept the terms to continue.' },
  render,
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <cc-checkbox disabled>Unchecked disabled</cc-checkbox>
      <cc-checkbox checked disabled>Checked disabled</cc-checkbox>
    </div>
  `,
};

export const Group: Story = {
  name: 'Checkbox Group',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <p style="margin: 0 0 4px; font-family: Inter, sans-serif; font-size: 14px; font-weight: 500; color: #374151;">
        Notifications
      </p>
      <cc-checkbox name="notif" value="email" checked>Email notifications</cc-checkbox>
      <cc-checkbox name="notif" value="sms">SMS notifications</cc-checkbox>
      <cc-checkbox name="notif" value="push">Push notifications</cc-checkbox>
    </div>
  `,
};

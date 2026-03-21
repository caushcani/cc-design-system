import type { Meta, StoryObj } from '@storybook/html';

type RadioGroupArgs = {
  label: string;
  value: string;
  disabled: boolean;
  required: boolean;
  hint: string;
  error: string;
};

const meta: Meta<RadioGroupArgs> = {
  title: 'Components/Radio Group',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Group label' },
    value: { control: 'text', description: 'Selected value' },
    disabled: {
      control: 'boolean',
      description: 'Disables all radios',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks group as required',
      table: { defaultValue: { summary: 'false' } },
    },
    hint: { control: 'text', description: 'Helper text' },
    error: { control: 'text', description: 'Error message' },
  },
  args: {
    label: 'Preferred contact method',
    value: '',
    disabled: false,
    required: false,
    hint: '',
    error: '',
  },
};

export default meta;
type Story = StoryObj<RadioGroupArgs>;

const render = (args: RadioGroupArgs) => `
  <cc-radio-group
    name="contact"
    label="${args.label}"
    value="${args.value}"
    hint="${args.hint}"
    error="${args.error}"
    ${args.disabled ? 'disabled' : ''}
    ${args.required ? 'required' : ''}
  >
    <cc-radio value="email" label="Email"></cc-radio>
    <cc-radio value="phone" label="Phone"></cc-radio>
    <cc-radio value="sms" label="SMS"></cc-radio>
  </cc-radio-group>
`;

export const Default: Story = { render };

export const WithPreselected: Story = {
  name: 'Pre-selected Value',
  args: { value: 'email' },
  render,
};

export const WithHint: Story = {
  name: 'With Hint',
  args: { hint: 'We will only contact you using this method.' },
  render,
};

export const WithError: Story = {
  name: 'Error State',
  args: { error: 'Please select a contact method.' },
  render,
};

export const Required: Story = {
  name: 'Required',
  args: { required: true },
  render,
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true, value: 'phone' },
  render,
};

export const InlineLayout: Story = {
  name: 'Inline Layout',
  render: () => `
    <style>
      .inline-group cc-radio-group::part(options) { flex-direction: row; gap: 24px; }
    </style>
    <cc-radio-group name="size" label="T-Shirt size" value="m">
      <div style="display: flex; gap: 24px;">
        <cc-radio value="s" label="Small"></cc-radio>
        <cc-radio value="m" label="Medium"></cc-radio>
        <cc-radio value="l" label="Large"></cc-radio>
        <cc-radio value="xl" label="X-Large"></cc-radio>
      </div>
    </cc-radio-group>
  `,
};

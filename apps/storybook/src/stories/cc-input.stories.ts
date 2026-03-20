import type { Meta, StoryObj } from '@storybook/html';

type InputArgs = {
  type: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel' | 'number';
  size: 'sm' | 'md' | 'lg';
  label: string;
  placeholder: string;
  hint: string;
  error: string;
  value: string;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
};

const meta: Meta<InputArgs> = {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'url', 'tel', 'number'],
      description: 'HTML input type',
      table: { defaultValue: { summary: 'text' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
      table: { defaultValue: { summary: 'md' } },
    },
    label: { control: 'text', description: 'Label displayed above the input' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    hint: { control: 'text', description: 'Helper text below the input' },
    error: { control: 'text', description: 'Error message (also triggers error state)' },
    value: { control: 'text', description: 'Current value' },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
      table: { defaultValue: { summary: 'false' } },
    },
    readonly: {
      control: 'boolean',
      description: 'Makes the input read-only',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks the input as required',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    type: 'text',
    size: 'md',
    label: 'Email address',
    placeholder: 'you@example.com',
    hint: '',
    error: '',
    value: '',
    disabled: false,
    readonly: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<InputArgs>;

const render = (args: InputArgs) =>
  `<cc-input
    type="${args.type}"
    size="${args.size}"
    label="${args.label}"
    placeholder="${args.placeholder}"
    hint="${args.hint}"
    error="${args.error}"
    value="${args.value}"
    name="demo"
    ${args.disabled ? 'disabled' : ''}
    ${args.readonly ? 'readonly' : ''}
    ${args.required ? 'required' : ''}
  ></cc-input>`;

export const Default: Story = { render };

export const WithHint: Story = {
  name: 'With Hint',
  args: { hint: 'We will never share your email.' },
  render,
};

export const WithError: Story = {
  name: 'Error State',
  args: { error: 'Please enter a valid email address.' },
  render,
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true, value: 'cannot edit this' },
  render,
};

export const Required: Story = {
  name: 'Required',
  args: { required: true, label: 'Full name' },
  render,
};

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
      <cc-input size="sm" label="Small" placeholder="Small input"></cc-input>
      <cc-input size="md" label="Medium" placeholder="Medium input"></cc-input>
      <cc-input size="lg" label="Large" placeholder="Large input"></cc-input>
    </div>
  `,
};

export const WithSlots: Story = {
  name: 'With Prefix / Suffix',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
      <cc-input label="Search" placeholder="Search...">
        <span slot="prefix">🔍</span>
      </cc-input>
      <cc-input label="Price" placeholder="0.00">
        <span slot="prefix">$</span>
      </cc-input>
      <cc-input label="Website" placeholder="example.com">
        <span slot="suffix">.com</span>
      </cc-input>
    </div>
  `,
};

export const Password: Story = {
  name: 'Password',
  args: { type: 'password', label: 'Password', placeholder: '••••••••' },
  render,
};

import type { Meta, StoryObj } from '@storybook/html';

type SelectArgs = {
  size: 'sm' | 'md' | 'lg';
  label: string;
  placeholder: string;
  hint: string;
  error: string;
  disabled: boolean;
  required: boolean;
};

const meta: Meta<SelectArgs> = {
  title: 'Components/Select',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select',
      table: { defaultValue: { summary: 'md' } },
    },
    label: { control: 'text', description: 'Label above the select' },
    placeholder: { control: 'text', description: 'Placeholder option text' },
    hint: { control: 'text', description: 'Helper text below the select' },
    error: { control: 'text', description: 'Error message (also triggers error state)' },
    disabled: {
      control: 'boolean',
      description: 'Disables the select',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks the select as required',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    size: 'md',
    label: 'Country',
    placeholder: 'Select a country',
    hint: '',
    error: '',
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<SelectArgs>;

const OPTIONS = `
  <option value="us">🇺🇸 United States</option>
  <option value="gb">🇬🇧 United Kingdom</option>
  <option value="ca">🇨🇦 Canada</option>
  <option value="au">🇦🇺 Australia</option>
`;

const render = (args: SelectArgs) =>
  `<cc-select
    size="${args.size}"
    label="${args.label}"
    placeholder="${args.placeholder}"
    hint="${args.hint}"
    error="${args.error}"
    name="demo"
    ${args.disabled ? 'disabled' : ''}
    ${args.required ? 'required' : ''}
  >${OPTIONS}</cc-select>`;

export const Default: Story = { render };

export const WithHint: Story = {
  name: 'With Hint',
  args: { hint: 'Used to calculate shipping rates.' },
  render,
};

export const WithError: Story = {
  name: 'Error State',
  args: { error: 'Please select a country.' },
  render,
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  render,
};

export const Required: Story = {
  name: 'Required',
  args: { required: true },
  render,
};

export const Empty: Story = {
  name: 'No Options',
  render: () => `<cc-select label="Category" placeholder="Select..."></cc-select>`,
};

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
      <cc-select size="sm" label="Small" placeholder="Select...">
        ${OPTIONS}
      </cc-select>
      <cc-select size="md" label="Medium" placeholder="Select...">
        ${OPTIONS}
      </cc-select>
      <cc-select size="lg" label="Large" placeholder="Select...">
        ${OPTIONS}
      </cc-select>
    </div>
  `,
};

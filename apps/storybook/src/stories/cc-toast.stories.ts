import type { Meta, StoryObj } from '@storybook/html';

type ToasterArgs = {
  position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
};

const meta: Meta<ToasterArgs> = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Where toasts appear on screen',
      table: { defaultValue: { summary: 'bottom-right' } },
    },
  },
  args: {
    position: 'bottom-right',
  },
};

export default meta;
type Story = StoryObj<ToasterArgs>;

export const Default: Story = {
  name: 'Interactive',
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 16px;">
        <cc-button variant="solid" size="sm" id="btn-info">Show Info</cc-button>
        <cc-button variant="solid" size="sm" id="btn-success">Show Success</cc-button>
        <cc-button variant="solid" size="sm" id="btn-warning">Show Warning</cc-button>
        <cc-button variant="solid" size="sm" id="btn-danger">Show Danger</cc-button>
        <cc-button variant="outline" size="sm" id="btn-with-title">With Title</cc-button>
        <cc-button variant="outline" size="sm" id="btn-persistent">Persistent</cc-button>
      </div>
      <cc-toaster id="toaster" position="${args.position}"></cc-toaster>
    `;

    setTimeout(() => {
      const toaster = container.querySelector('#toaster') as any;
      if (!toaster) return;

      container
        .querySelector('#btn-info')
        ?.addEventListener('click', () =>
          toaster.show({ variant: 'info', message: 'Here is some useful information.' }),
        );
      container
        .querySelector('#btn-success')
        ?.addEventListener('click', () =>
          toaster.show({ variant: 'success', message: 'Your changes have been saved.' }),
        );
      container
        .querySelector('#btn-warning')
        ?.addEventListener('click', () =>
          toaster.show({ variant: 'warning', message: 'Your session will expire soon.' }),
        );
      container
        .querySelector('#btn-danger')
        ?.addEventListener('click', () =>
          toaster.show({ variant: 'danger', message: 'Something went wrong. Please try again.' }),
        );
      container
        .querySelector('#btn-with-title')
        ?.addEventListener('click', () =>
          toaster.show({
            variant: 'success',
            title: 'Payment received',
            message: 'Invoice #1042 has been paid.',
          }),
        );
      container
        .querySelector('#btn-persistent')
        ?.addEventListener('click', () =>
          toaster.show({
            variant: 'info',
            message: 'This toast stays until dismissed.',
            duration: 0,
          }),
        );
    }, 100);

    return container;
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 8px; max-width: 400px; padding: 16px;">
      <cc-toast variant="info"    message="Here is some useful information." duration="0"></cc-toast>
      <cc-toast variant="success" message="Your changes have been saved."     duration="0"></cc-toast>
      <cc-toast variant="warning" message="Your session will expire soon."    duration="0"></cc-toast>
      <cc-toast variant="danger"  message="Something went wrong."             duration="0"></cc-toast>
    </div>
  `,
};

export const WithTitle: Story = {
  name: 'With Title',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 8px; max-width: 400px; padding: 16px;">
      <cc-toast variant="success" title="Payment received" message="Invoice #1042 has been paid." duration="0"></cc-toast>
      <cc-toast variant="danger"  title="Upload failed"    message="File exceeds the 10 MB limit." duration="0"></cc-toast>
    </div>
  `,
};

export const NotDismissible: Story = {
  name: 'Not Dismissible',
  render: () => `
    <div style="max-width: 400px; padding: 16px;">
      <cc-toast variant="info" message="This toast has no close button." duration="0" dismissible="false"></cc-toast>
    </div>
  `,
};

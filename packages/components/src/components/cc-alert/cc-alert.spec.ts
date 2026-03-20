import { newSpecPage } from '@stencil/core/testing';
import { CcAlert } from './cc-alert';

describe('cc-alert', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [CcAlert],
      html: `<cc-alert>Something happened.</cc-alert>`,
    });

    const alert = page.root!.shadowRoot!.querySelector('.cc-alert');
    expect(alert).not.toBeNull();
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [CcAlert],
      html: `<cc-alert variant="success">OK</cc-alert>`,
    });

    const alert = page.root!.shadowRoot!.querySelector('.cc-alert');
    expect(alert!.classList.contains('cc-alert--success')).toBe(true);
  });

  it('defaults to info variant', async () => {
    const page = await newSpecPage({
      components: [CcAlert],
      html: `<cc-alert>Message</cc-alert>`,
    });

    const alert = page.root!.shadowRoot!.querySelector('.cc-alert');
    expect(alert!.classList.contains('cc-alert--info')).toBe(true);
  });

  it('renders heading when provided', async () => {
    const page = await newSpecPage({
      components: [CcAlert],
      html: `<cc-alert heading="Attention">Body text.</cc-alert>`,
    });

    const heading = page.root!.shadowRoot!.querySelector('.cc-alert__heading');
    expect(heading).not.toBeNull();
    expect(heading!.textContent).toBe('Attention');
  });

  it('does not render heading when omitted', async () => {
    const page = await newSpecPage({
      components: [CcAlert],
      html: `<cc-alert>Body text.</cc-alert>`,
    });

    const heading = page.root!.shadowRoot!.querySelector('.cc-alert__heading');
    expect(heading).toBeNull();
  });

  it('renders icon by default', async () => {
    const page = await newSpecPage({
      components: [CcAlert],
      html: `<cc-alert>Message</cc-alert>`,
    });

    const icon = page.root!.shadowRoot!.querySelector('.cc-alert__icon');
    expect(icon).not.toBeNull();
  });

  it('hides icon when hide-icon is set', async () => {
    const page = await newSpecPage({
      components: [CcAlert],
      html: `<cc-alert hide-icon>Message</cc-alert>`,
    });

    const icon = page.root!.shadowRoot!.querySelector('.cc-alert__icon');
    expect(icon).toBeNull();
  });

  it('does not render dismiss button by default', async () => {
    const page = await newSpecPage({
      components: [CcAlert],
      html: `<cc-alert>Message</cc-alert>`,
    });

    const btn = page.root!.shadowRoot!.querySelector('.cc-alert__close');
    expect(btn).toBeNull();
  });

  it('renders dismiss button when dismissible', async () => {
    const page = await newSpecPage({
      components: [CcAlert],
      html: `<cc-alert dismissible>Message</cc-alert>`,
    });

    const btn = page.root!.shadowRoot!.querySelector('.cc-alert__close');
    expect(btn).not.toBeNull();
  });

  it('emits ccDismiss and hides itself when dismiss button is clicked', async () => {
    const page = await newSpecPage({
      components: [CcAlert],
      html: `<cc-alert dismissible>Message</cc-alert>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccDismiss', spy);

    const btn = page.root!.shadowRoot!.querySelector<HTMLButtonElement>('.cc-alert__close')!;
    btn.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(page.root!.shadowRoot!.querySelector('.cc-alert')).toBeNull();
  });

  it('sets role=alert on host', async () => {
    const page = await newSpecPage({
      components: [CcAlert],
      html: `<cc-alert>Message</cc-alert>`,
    });

    expect(page.root!.getAttribute('role')).toBe('alert');
  });

  it('renders all variants without error', async () => {
    const variants = ['info', 'success', 'warning', 'danger'];

    for (const variant of variants) {
      const page = await newSpecPage({
        components: [CcAlert],
        html: `<cc-alert variant="${variant}">Message</cc-alert>`,
      });

      const alert = page.root!.shadowRoot!.querySelector('.cc-alert');
      expect(alert!.classList.contains(`cc-alert--${variant}`)).toBe(true);
    }
  });
});

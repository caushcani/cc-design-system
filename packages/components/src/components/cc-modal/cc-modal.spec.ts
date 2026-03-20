import { newSpecPage } from '@stencil/core/testing';
import { CcModal } from './cc-modal';

describe('cc-modal', () => {
  it('renders hidden by default', async () => {
    const page = await newSpecPage({
      components: [CcModal],
      html: `<cc-modal heading="Test"></cc-modal>`,
    });

    const dialog = page.root!.shadowRoot!.querySelector('.cc-modal__dialog');
    expect(dialog!.classList.contains('cc-modal__dialog--visible')).toBe(false);
  });

  it('renders visible when open is set', async () => {
    const page = await newSpecPage({
      components: [CcModal],
      html: `<cc-modal heading="Test" open></cc-modal>`,
    });

    const dialog = page.root!.shadowRoot!.querySelector('.cc-modal__dialog');
    expect(dialog!.classList.contains('cc-modal__dialog--visible')).toBe(true);
  });

  it('renders the heading', async () => {
    const page = await newSpecPage({
      components: [CcModal],
      html: `<cc-modal heading="Hello World" open></cc-modal>`,
    });

    const heading = page.root!.shadowRoot!.querySelector('.cc-modal__heading');
    expect(heading).not.toBeNull();
    expect(heading!.textContent).toBe('Hello World');
  });

  it('applies size class to dialog', async () => {
    const page = await newSpecPage({
      components: [CcModal],
      html: `<cc-modal heading="Test" size="lg" open></cc-modal>`,
    });

    const dialog = page.root!.shadowRoot!.querySelector('.cc-modal__dialog');
    expect(dialog!.classList.contains('cc-modal__dialog--lg')).toBe(true);
    expect(dialog!.classList.contains('cc-modal__dialog--md')).toBe(false);
  });

  it('renders close button by default', async () => {
    const page = await newSpecPage({
      components: [CcModal],
      html: `<cc-modal heading="Test" open></cc-modal>`,
    });

    const closeBtn = page.root!.shadowRoot!.querySelector('.cc-modal__close');
    expect(closeBtn).not.toBeNull();
  });

  it('hides close button when hide-close is set', async () => {
    const page = await newSpecPage({
      components: [CcModal],
      html: `<cc-modal heading="Test" hide-close open></cc-modal>`,
    });

    const closeBtn = page.root!.shadowRoot!.querySelector('.cc-modal__close');
    expect(closeBtn).toBeNull();
  });

  it('emits ccClose and closes when close button clicked', async () => {
    const page = await newSpecPage({
      components: [CcModal],
      html: `<cc-modal heading="Test" open></cc-modal>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccClose', spy);

    const closeBtn = page.root!.shadowRoot!.querySelector<HTMLButtonElement>('.cc-modal__close')!;
    closeBtn.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(page.root!.open).toBe(false);
  });

  it('emits ccClose and closes when backdrop clicked', async () => {
    const page = await newSpecPage({
      components: [CcModal],
      html: `<cc-modal heading="Test" open></cc-modal>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccClose', spy);

    const backdrop = page.root!.shadowRoot!.querySelector<HTMLElement>('.cc-modal__overlay')!;
    backdrop.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(page.root!.open).toBe(false);
  });

  it('does not close on backdrop click when static-backdrop is set', async () => {
    const page = await newSpecPage({
      components: [CcModal],
      html: `<cc-modal heading="Test" static-backdrop open></cc-modal>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccClose', spy);

    const backdrop = page.root!.shadowRoot!.querySelector<HTMLElement>('.cc-modal__overlay')!;
    backdrop.click();
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
    expect(page.root!.open).toBe(true);
  });

  it('show() method opens the modal', async () => {
    const page = await newSpecPage({
      components: [CcModal],
      html: `<cc-modal heading="Test"></cc-modal>`,
    });

    expect(page.root!.open).toBe(false);
    await (page.root as any).show();
    await page.waitForChanges();
    expect(page.root!.open).toBe(true);
  });

  it('hide() method closes the modal', async () => {
    const page = await newSpecPage({
      components: [CcModal],
      html: `<cc-modal heading="Test" open></cc-modal>`,
    });

    expect(page.root!.open).toBe(true);
    await (page.root as any).hide();
    await page.waitForChanges();
    expect(page.root!.open).toBe(false);
  });

  it('sets aria-modal on dialog', async () => {
    const page = await newSpecPage({
      components: [CcModal],
      html: `<cc-modal heading="Test" open></cc-modal>`,
    });

    const dialog = page.root!.shadowRoot!.querySelector('.cc-modal__dialog');
    expect(dialog!.getAttribute('aria-modal')).toBe('true');
    expect(dialog!.getAttribute('role')).toBe('dialog');
  });
});

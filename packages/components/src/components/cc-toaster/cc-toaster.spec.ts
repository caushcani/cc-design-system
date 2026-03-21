import { newSpecPage } from '@stencil/core/testing';
import { CcToaster } from './cc-toaster';
import { CcToast } from '../cc-toast/cc-toast';

describe('cc-toaster', () => {
  it('renders with no toasts initially', async () => {
    const page = await newSpecPage({
      components: [CcToaster, CcToast],
      html: `<cc-toaster></cc-toaster>`,
    });

    const toasts = page.root!.shadowRoot!.querySelectorAll('cc-toast');
    expect(toasts.length).toBe(0);
  });

  it('applies position class', async () => {
    const page = await newSpecPage({
      components: [CcToaster, CcToast],
      html: `<cc-toaster position="top-left"></cc-toaster>`,
    });

    const container = page.root!.shadowRoot!.querySelector('.cc-toaster');
    expect(container!.classList.contains('cc-toaster--top-left')).toBe(true);
  });

  it('defaults to bottom-right position', async () => {
    const page = await newSpecPage({
      components: [CcToaster, CcToast],
      html: `<cc-toaster></cc-toaster>`,
    });

    const container = page.root!.shadowRoot!.querySelector('.cc-toaster');
    expect(container!.classList.contains('cc-toaster--bottom-right')).toBe(true);
  });

  it('show() adds a toast', async () => {
    const page = await newSpecPage({
      components: [CcToaster, CcToast],
      html: `<cc-toaster></cc-toaster>`,
    });

    const toaster = page.rootInstance as CcToaster;
    await toaster.show({ message: 'Hello' });
    await page.waitForChanges();

    const toasts = page.root!.shadowRoot!.querySelectorAll('cc-toast');
    expect(toasts.length).toBe(1);
  });

  it('show() returns a unique id', async () => {
    const page = await newSpecPage({
      components: [CcToaster, CcToast],
      html: `<cc-toaster></cc-toaster>`,
    });

    const toaster = page.rootInstance as CcToaster;
    const id1 = await toaster.show({ message: 'First' });
    const id2 = await toaster.show({ message: 'Second' });

    expect(id1).not.toBe(id2);
  });

  it('show() adds multiple toasts', async () => {
    const page = await newSpecPage({
      components: [CcToaster, CcToast],
      html: `<cc-toaster></cc-toaster>`,
    });

    const toaster = page.rootInstance as CcToaster;
    await toaster.show({ message: 'First' });
    await toaster.show({ message: 'Second' });
    await toaster.show({ message: 'Third' });
    await page.waitForChanges();

    const toasts = page.root!.shadowRoot!.querySelectorAll('cc-toast');
    expect(toasts.length).toBe(3);
  });

  it('dismiss() removes a toast by id', async () => {
    const page = await newSpecPage({
      components: [CcToaster, CcToast],
      html: `<cc-toaster></cc-toaster>`,
    });

    const toaster = page.rootInstance as CcToaster;
    const id = await toaster.show({ message: 'Remove me' });
    await toaster.show({ message: 'Keep me' });
    await page.waitForChanges();

    await toaster.dismiss(id);
    await page.waitForChanges();

    const toasts = page.root!.shadowRoot!.querySelectorAll('cc-toast');
    expect(toasts.length).toBe(1);
  });
});

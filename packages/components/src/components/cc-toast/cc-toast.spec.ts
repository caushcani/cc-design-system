import { newSpecPage } from '@stencil/core/testing';
import { CcToast } from './cc-toast';

describe('cc-toast', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="Hello" duration="0"></cc-toast>`,
    });

    const toast = page.root!.shadowRoot!.querySelector('.cc-toast');
    expect(toast).not.toBeNull();
    expect(toast!.classList.contains('cc-toast--info')).toBe(true);
  });

  it('renders the message', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="File saved" duration="0"></cc-toast>`,
    });

    const msg = page.root!.shadowRoot!.querySelector('.cc-toast__message');
    expect(msg!.textContent).toBe('File saved');
  });

  it('renders the title when provided', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast title="Success" message="Done" duration="0"></cc-toast>`,
    });

    const title = page.root!.shadowRoot!.querySelector('.cc-toast__title');
    expect(title!.textContent).toBe('Success');
  });

  it('does not render title when omitted', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="No title" duration="0"></cc-toast>`,
    });

    const title = page.root!.shadowRoot!.querySelector('.cc-toast__title');
    expect(title).toBeNull();
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast variant="success" message="Saved" duration="0"></cc-toast>`,
    });

    const toast = page.root!.shadowRoot!.querySelector('.cc-toast');
    expect(toast!.classList.contains('cc-toast--success')).toBe(true);
  });

  it('renders close button when dismissible', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="Msg" dismissible duration="0"></cc-toast>`,
    });

    const btn = page.root!.shadowRoot!.querySelector('.cc-toast__close');
    expect(btn).not.toBeNull();
  });

  it('does not render close button when not dismissible', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="Msg" dismissible="false" duration="0"></cc-toast>`,
    });

    const btn = page.root!.shadowRoot!.querySelector('.cc-toast__close');
    expect(btn).toBeNull();
  });

  it('emits ccClose when close button clicked', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="Msg" dismissible duration="0"></cc-toast>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccClose', spy);

    const btn = page.root!.shadowRoot!.querySelector('.cc-toast__close') as HTMLElement;
    btn.click();

    jest.runAllTimers();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('emits ccClose after duration', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="Msg" duration="2000"></cc-toast>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccClose', spy);

    jest.advanceTimersByTime(2000);
    jest.runAllTimers();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not auto-dismiss when duration is 0', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="Msg" duration="0"></cc-toast>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccClose', spy);

    jest.advanceTimersByTime(10000);
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CcToast } from './cc-toast';

describe('cc-toast', () => {
  afterEach(() => jest.useRealTimers());
  it('renders with default variant', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="Hello" duration="0"></cc-toast>`,
    });

    const toast = page.root!.shadowRoot!.querySelector('.cc-toast');
    expect(toast).not.toBeNull();
    expect(toast!.classList.contains('cc-toast--info')).toBe(true);
  });

  it('applies the correct variant class', async () => {
    for (const variant of ['info', 'success', 'warning', 'danger'] as const) {
      const page = await newSpecPage({
        components: [CcToast],
        html: `<cc-toast variant="${variant}" message="Msg" duration="0"></cc-toast>`,
      });
      const toast = page.root!.shadowRoot!.querySelector('.cc-toast');
      expect(toast!.classList.contains(`cc-toast--${variant}`)).toBe(true);
    }
  });

  it('renders the message', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="File saved successfully" duration="0"></cc-toast>`,
    });

    const msg = page.root!.shadowRoot!.querySelector('.cc-toast__message');
    expect(msg!.textContent).toBe('File saved successfully');
  });

  it('renders the title when provided', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast title="Done" message="All good" duration="0"></cc-toast>`,
    });

    const title = page.root!.shadowRoot!.querySelector('.cc-toast__title');
    expect(title!.textContent).toBe('Done');
  });

  it('does not render title element when title is empty', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="No title" duration="0"></cc-toast>`,
    });

    const title = page.root!.shadowRoot!.querySelector('.cc-toast__title');
    expect(title).toBeNull();
  });

  it('renders close button when dismissible', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="Msg" duration="0"></cc-toast>`,
    });

    const btn = page.root!.shadowRoot!.querySelector('.cc-toast__close');
    expect(btn).not.toBeNull();
  });

  it('does not render close button when dismissible is false', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="Msg" dismissible="false" duration="0"></cc-toast>`,
    });

    const btn = page.root!.shadowRoot!.querySelector('.cc-toast__close');
    expect(btn).toBeNull();
  });

  it('emits ccClose when close button is clicked', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="Msg" duration="0"></cc-toast>`,
    });

    // Fake timers AFTER newSpecPage — Stencil scheduler uses real timers during init
    jest.useFakeTimers();

    const spy = jest.fn();
    page.root!.addEventListener('ccClose', spy);

    const btn = page.root!.shadowRoot!.querySelector('.cc-toast__close') as HTMLElement;
    btn.click();
    jest.advanceTimersByTime(300);
    jest.useRealTimers();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('registers auto-dismiss timer when duration > 0', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="Msg" duration="3000"></cc-toast>`,
    });

    const instance = page.rootInstance as any;
    expect(instance.timer).toBeDefined();

    // Cancel all timers by simulating component disconnect
    instance.disconnectedCallback();
  });

  it('does not register auto-dismiss timer when duration is 0', async () => {
    const page = await newSpecPage({
      components: [CcToast],
      html: `<cc-toast message="Msg" duration="0"></cc-toast>`,
    });

    expect((page.rootInstance as any).timer).toBeUndefined();
  });
});

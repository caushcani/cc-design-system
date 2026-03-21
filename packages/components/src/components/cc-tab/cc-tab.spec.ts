import { newSpecPage } from '@stencil/core/testing';
import { CcTab } from './cc-tab';

describe('cc-tab', () => {
  it('renders a button', async () => {
    const page = await newSpecPage({
      components: [CcTab],
      html: `<cc-tab value="a">Label</cc-tab>`,
    });

    const btn = page.root!.shadowRoot!.querySelector('button');
    expect(btn).not.toBeNull();
  });

  it('is not active by default', async () => {
    const page = await newSpecPage({
      components: [CcTab],
      html: `<cc-tab value="a">Label</cc-tab>`,
    });

    const btn = page.root!.shadowRoot!.querySelector('button');
    expect(btn!.classList.contains('cc-tab--active')).toBe(false);
    expect(page.root!.getAttribute('aria-selected')).toBe('false');
  });

  it('applies active class and aria-selected when active', async () => {
    const page = await newSpecPage({
      components: [CcTab],
      html: `<cc-tab value="a" active>Label</cc-tab>`,
    });

    const btn = page.root!.shadowRoot!.querySelector('button');
    expect(btn!.classList.contains('cc-tab--active')).toBe(true);
    expect(page.root!.getAttribute('aria-selected')).toBe('true');
  });

  it('applies disabled class', async () => {
    const page = await newSpecPage({
      components: [CcTab],
      html: `<cc-tab value="a" disabled>Label</cc-tab>`,
    });

    const btn = page.root!.shadowRoot!.querySelector('button');
    expect(btn!.hasAttribute('disabled')).toBe(true);
    expect(btn!.classList.contains('cc-tab--disabled')).toBe(true);
  });

  it('emits ccTabSelect with value on click', async () => {
    const page = await newSpecPage({
      components: [CcTab],
      html: `<cc-tab value="dashboard">Label</cc-tab>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccTabSelect', spy);

    const btn = page.root!.shadowRoot!.querySelector('button') as HTMLElement;
    btn.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe('dashboard');
  });

  it('does not emit when disabled', async () => {
    const page = await newSpecPage({
      components: [CcTab],
      html: `<cc-tab value="a" disabled>Label</cc-tab>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccTabSelect', spy);

    const btn = page.root!.shadowRoot!.querySelector('button') as HTMLElement;
    btn.click();
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('does not emit when already active', async () => {
    const page = await newSpecPage({
      components: [CcTab],
      html: `<cc-tab value="a" active>Label</cc-tab>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccTabSelect', spy);

    const btn = page.root!.shadowRoot!.querySelector('button') as HTMLElement;
    btn.click();
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
  });
});

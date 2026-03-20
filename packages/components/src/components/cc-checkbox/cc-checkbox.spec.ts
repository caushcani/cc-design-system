import { newSpecPage } from '@stencil/core/testing';
import { CcCheckbox } from './cc-checkbox';

describe('cc-checkbox', () => {
  it('renders an input of type checkbox', async () => {
    const page = await newSpecPage({
      components: [CcCheckbox],
      html: `<cc-checkbox>Label</cc-checkbox>`,
    });

    const input = page.root!.shadowRoot!.querySelector('input[type="checkbox"]');
    expect(input).not.toBeNull();
  });

  it('is unchecked by default', async () => {
    const page = await newSpecPage({
      components: [CcCheckbox],
      html: `<cc-checkbox>Label</cc-checkbox>`,
    });

    const input = page.root!.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    expect(input.checked).toBe(false);
  });

  it('renders checked when checked prop is set', async () => {
    const page = await newSpecPage({
      components: [CcCheckbox],
      html: `<cc-checkbox checked>Label</cc-checkbox>`,
    });

    const input = page.root!.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    expect(input.checked).toBe(true);
  });

  it('disables the input when disabled', async () => {
    const page = await newSpecPage({
      components: [CcCheckbox],
      html: `<cc-checkbox disabled>Label</cc-checkbox>`,
    });

    const input = page.root!.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    const label = page.root!.shadowRoot!.querySelector('.cc-checkbox')!;
    expect(input.disabled).toBe(true);
    expect(label.classList.contains('cc-checkbox--disabled')).toBe(true);
  });

  it('applies error class and shows error message', async () => {
    const page = await newSpecPage({
      components: [CcCheckbox],
      html: `<cc-checkbox error="Required">Label</cc-checkbox>`,
    });

    const label = page.root!.shadowRoot!.querySelector('.cc-checkbox')!;
    const errorMsg = page.root!.shadowRoot!.querySelector('.cc-checkbox__message--error')!;
    expect(label.classList.contains('cc-checkbox--error')).toBe(true);
    expect(errorMsg.textContent).toBe('Required');
  });

  it('shows hint when no error', async () => {
    const page = await newSpecPage({
      components: [CcCheckbox],
      html: `<cc-checkbox hint="Helper text">Label</cc-checkbox>`,
    });

    const hint = page.root!.shadowRoot!.querySelector('.cc-checkbox__message--hint')!;
    expect(hint).not.toBeNull();
    expect(hint.textContent).toBe('Helper text');
  });

  it('hides hint when error is present', async () => {
    const page = await newSpecPage({
      components: [CcCheckbox],
      html: `<cc-checkbox hint="Helper" error="Bad">Label</cc-checkbox>`,
    });

    const hint = page.root!.shadowRoot!.querySelector('.cc-checkbox__message--hint');
    expect(hint).toBeNull();
  });

  it('shows required asterisk', async () => {
    const page = await newSpecPage({
      components: [CcCheckbox],
      html: `<cc-checkbox required>Label</cc-checkbox>`,
    });

    const asterisk = page.root!.shadowRoot!.querySelector('.cc-checkbox__required');
    expect(asterisk).not.toBeNull();
  });

  it('sets aria-invalid when error is present', async () => {
    const page = await newSpecPage({
      components: [CcCheckbox],
      html: `<cc-checkbox error="Invalid">Label</cc-checkbox>`,
    });

    const input = page.root!.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('emits ccChange with new checked value on change', async () => {
    const page = await newSpecPage({
      components: [CcCheckbox],
      html: `<cc-checkbox>Label</cc-checkbox>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccChange', spy);

    const input = page.root!.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(page.root!.checked).toBe(true);
  });

  it('clears indeterminate state on change', async () => {
    const page = await newSpecPage({
      components: [CcCheckbox],
      html: `<cc-checkbox indeterminate>Label</cc-checkbox>`,
    });

    expect(page.root!.indeterminate).toBe(true);

    const input = page.root!.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(page.root!.indeterminate).toBe(false);
  });

  it('renders the custom control element', async () => {
    const page = await newSpecPage({
      components: [CcCheckbox],
      html: `<cc-checkbox>Label</cc-checkbox>`,
    });

    const control = page.root!.shadowRoot!.querySelector('.cc-checkbox__control');
    expect(control).not.toBeNull();
  });
});

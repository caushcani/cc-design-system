import { newSpecPage } from '@stencil/core/testing';
import { CcInput } from './cc-input';

describe('cc-input', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [CcInput],
      html: `<cc-input></cc-input>`,
    });

    const input = page.root!.shadowRoot!.querySelector('input');
    expect(input).not.toBeNull();
    expect(input!.type).toBe('text');
    expect(input!.disabled).toBe(false);
  });

  it('renders a label when provided', async () => {
    const page = await newSpecPage({
      components: [CcInput],
      html: `<cc-input label="Email"></cc-input>`,
    });

    const label = page.root!.shadowRoot!.querySelector('label');
    expect(label).not.toBeNull();
    expect(label!.textContent).toContain('Email');
  });

  it('does not render a label when omitted', async () => {
    const page = await newSpecPage({
      components: [CcInput],
      html: `<cc-input></cc-input>`,
    });

    const label = page.root!.shadowRoot!.querySelector('label');
    expect(label).toBeNull();
  });

  it('applies size class to wrapper', async () => {
    const page = await newSpecPage({
      components: [CcInput],
      html: `<cc-input size="lg"></cc-input>`,
    });

    const wrapper = page.root!.shadowRoot!.querySelector('.cc-input__wrapper');
    expect(wrapper!.classList.contains('cc-input__wrapper--lg')).toBe(true);
    expect(wrapper!.classList.contains('cc-input__wrapper--md')).toBe(false);
  });

  it('sets the input type', async () => {
    const page = await newSpecPage({
      components: [CcInput],
      html: `<cc-input type="email"></cc-input>`,
    });

    const input = page.root!.shadowRoot!.querySelector('input');
    expect(input!.type).toBe('email');
  });

  it('disables the input', async () => {
    const page = await newSpecPage({
      components: [CcInput],
      html: `<cc-input disabled></cc-input>`,
    });

    const input = page.root!.shadowRoot!.querySelector('input');
    const wrapper = page.root!.shadowRoot!.querySelector('.cc-input__wrapper');
    expect(input!.disabled).toBe(true);
    expect(wrapper!.classList.contains('cc-input__wrapper--disabled')).toBe(true);
  });

  it('shows error message and applies error class', async () => {
    const page = await newSpecPage({
      components: [CcInput],
      html: `<cc-input error="Required field"></cc-input>`,
    });

    const errorMsg = page.root!.shadowRoot!.querySelector('.cc-input__message--error');
    const wrapper = page.root!.shadowRoot!.querySelector('.cc-input__wrapper');
    expect(errorMsg).not.toBeNull();
    expect(errorMsg!.textContent).toBe('Required field');
    expect(wrapper!.classList.contains('cc-input__wrapper--error')).toBe(true);
  });

  it('shows hint when no error', async () => {
    const page = await newSpecPage({
      components: [CcInput],
      html: `<cc-input hint="Helper text"></cc-input>`,
    });

    const hint = page.root!.shadowRoot!.querySelector('.cc-input__message--hint');
    expect(hint).not.toBeNull();
    expect(hint!.textContent).toBe('Helper text');
  });

  it('hides hint when error is present', async () => {
    const page = await newSpecPage({
      components: [CcInput],
      html: `<cc-input hint="Helper text" error="Bad value"></cc-input>`,
    });

    const hint = page.root!.shadowRoot!.querySelector('.cc-input__message--hint');
    expect(hint).toBeNull();
  });

  it('sets aria-invalid when error is present', async () => {
    const page = await newSpecPage({
      components: [CcInput],
      html: `<cc-input error="Invalid"></cc-input>`,
    });

    const input = page.root!.shadowRoot!.querySelector('input');
    expect(input!.getAttribute('aria-invalid')).toBe('true');
  });

  it('shows required asterisk when required', async () => {
    const page = await newSpecPage({
      components: [CcInput],
      html: `<cc-input label="Name" required></cc-input>`,
    });

    const asterisk = page.root!.shadowRoot!.querySelector('.cc-input__required');
    expect(asterisk).not.toBeNull();
  });

  it('emits ccInput event on input', async () => {
    const page = await newSpecPage({
      components: [CcInput],
      html: `<cc-input></cc-input>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccInput', spy);

    const input = page.root!.shadowRoot!.querySelector('input')!;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

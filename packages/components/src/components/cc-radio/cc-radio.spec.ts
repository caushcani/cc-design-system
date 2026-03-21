import { newSpecPage } from '@stencil/core/testing';
import { CcRadio } from './cc-radio';

describe('cc-radio', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [CcRadio],
      html: `<cc-radio value="a" label="Option A"></cc-radio>`,
    });

    const input = page.root!.shadowRoot!.querySelector('input');
    expect(input).not.toBeNull();
    expect(input!.type).toBe('radio');
    expect(input!.checked).toBe(false);
    expect(input!.disabled).toBe(false);
  });

  it('renders label text', async () => {
    const page = await newSpecPage({
      components: [CcRadio],
      html: `<cc-radio value="a" label="Option A"></cc-radio>`,
    });

    const label = page.root!.shadowRoot!.querySelector('.cc-radio__label-text');
    expect(label!.textContent).toBe('Option A');
  });

  it('reflects checked prop', async () => {
    const page = await newSpecPage({
      components: [CcRadio],
      html: `<cc-radio value="a" label="A" checked></cc-radio>`,
    });

    const input = page.root!.shadowRoot!.querySelector('input');
    expect(input!.checked).toBe(true);
  });

  it('disables the input', async () => {
    const page = await newSpecPage({
      components: [CcRadio],
      html: `<cc-radio value="a" label="A" disabled></cc-radio>`,
    });

    const input = page.root!.shadowRoot!.querySelector('input');
    expect(input!.disabled).toBe(true);
    const label = page.root!.shadowRoot!.querySelector('.cc-radio');
    expect(label!.classList.contains('cc-radio--disabled')).toBe(true);
  });

  it('emits ccRadioChange with value on change', async () => {
    const page = await newSpecPage({
      components: [CcRadio],
      html: `<cc-radio value="email" label="Email"></cc-radio>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccRadioChange', spy);

    const input = page.root!.shadowRoot!.querySelector('input')!;
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe('email');
  });

  it('does not emit when disabled', async () => {
    const page = await newSpecPage({
      components: [CcRadio],
      html: `<cc-radio value="email" label="Email" disabled></cc-radio>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccRadioChange', spy);

    const input = page.root!.shadowRoot!.querySelector('input')!;
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('sets name attribute on input', async () => {
    const page = await newSpecPage({
      components: [CcRadio],
      html: `<cc-radio value="a" label="A" name="group1"></cc-radio>`,
    });

    const input = page.root!.shadowRoot!.querySelector('input');
    expect(input!.name).toBe('group1');
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CcSelect } from './cc-select';

describe('cc-select', () => {
  it('renders a select element', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select></cc-select>`,
    });

    const select = page.root!.shadowRoot!.querySelector('select');
    expect(select).not.toBeNull();
  });

  it('renders a label when provided', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select label="Country"></cc-select>`,
    });

    const label = page.root!.shadowRoot!.querySelector('label');
    expect(label).not.toBeNull();
    expect(label!.textContent).toContain('Country');
  });

  it('does not render a label when omitted', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select></cc-select>`,
    });

    const label = page.root!.shadowRoot!.querySelector('label');
    expect(label).toBeNull();
  });

  it('renders a placeholder option when provided', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select placeholder="Pick one"></cc-select>`,
    });

    const placeholder = page.root!.shadowRoot!.querySelector('option[value=""]');
    expect(placeholder).not.toBeNull();
    expect(placeholder!.textContent).toBe('Pick one');
  });

  it('applies size class to wrapper', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select size="lg"></cc-select>`,
    });

    const wrapper = page.root!.shadowRoot!.querySelector('.cc-select__wrapper');
    expect(wrapper!.classList.contains('cc-select__wrapper--lg')).toBe(true);
    expect(wrapper!.classList.contains('cc-select__wrapper--md')).toBe(false);
  });

  it('disables the select', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select disabled></cc-select>`,
    });

    const select = page.root!.shadowRoot!.querySelector('select');
    const wrapper = page.root!.shadowRoot!.querySelector('.cc-select__wrapper');
    expect(select!.hasAttribute('disabled')).toBe(true);
    expect(wrapper!.classList.contains('cc-select__wrapper--disabled')).toBe(true);
  });

  it('shows error message and applies error class', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select error="Required"></cc-select>`,
    });

    const errorMsg = page.root!.shadowRoot!.querySelector('.cc-select__message--error');
    const wrapper = page.root!.shadowRoot!.querySelector('.cc-select__wrapper');
    expect(errorMsg).not.toBeNull();
    expect(errorMsg!.textContent).toBe('Required');
    expect(wrapper!.classList.contains('cc-select__wrapper--error')).toBe(true);
  });

  it('shows hint when no error', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select hint="Helper text"></cc-select>`,
    });

    const hint = page.root!.shadowRoot!.querySelector('.cc-select__message--hint');
    expect(hint).not.toBeNull();
    expect(hint!.textContent).toBe('Helper text');
  });

  it('hides hint when error is present', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select hint="Helper" error="Bad"></cc-select>`,
    });

    const hint = page.root!.shadowRoot!.querySelector('.cc-select__message--hint');
    expect(hint).toBeNull();
  });

  it('sets aria-invalid when error is present', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select error="Invalid"></cc-select>`,
    });

    const select = page.root!.shadowRoot!.querySelector('select');
    expect(select!.getAttribute('aria-invalid')).toBe('true');
  });

  it('shows required asterisk', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select label="Country" required></cc-select>`,
    });

    const asterisk = page.root!.shadowRoot!.querySelector('.cc-select__required');
    expect(asterisk).not.toBeNull();
  });

  it('renders chevron icon', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select></cc-select>`,
    });

    const chevron = page.root!.shadowRoot!.querySelector('.cc-select__chevron');
    expect(chevron).not.toBeNull();
  });

  it('emits ccChange on selection', async () => {
    const page = await newSpecPage({
      components: [CcSelect],
      html: `<cc-select></cc-select>`,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccChange', spy);

    const select = page.root!.shadowRoot!.querySelector('select')!;
    select.value = 'us';
    select.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

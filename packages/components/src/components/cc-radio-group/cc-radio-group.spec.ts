import { newSpecPage } from '@stencil/core/testing';
import { CcRadioGroup } from './cc-radio-group';
import { CcRadio } from '../cc-radio/cc-radio';

describe('cc-radio-group', () => {
  it('renders a fieldset', async () => {
    const page = await newSpecPage({
      components: [CcRadioGroup, CcRadio],
      html: `<cc-radio-group name="test" label="Choose"></cc-radio-group>`,
    });

    const fieldset = page.root!.shadowRoot!.querySelector('fieldset');
    expect(fieldset).not.toBeNull();
  });

  it('renders the legend when label is provided', async () => {
    const page = await newSpecPage({
      components: [CcRadioGroup, CcRadio],
      html: `<cc-radio-group name="test" label="Pick one"></cc-radio-group>`,
    });

    const legend = page.root!.shadowRoot!.querySelector('legend');
    expect(legend!.textContent).toContain('Pick one');
  });

  it('does not render legend when no label', async () => {
    const page = await newSpecPage({
      components: [CcRadioGroup, CcRadio],
      html: `<cc-radio-group name="test"></cc-radio-group>`,
    });

    const legend = page.root!.shadowRoot!.querySelector('legend');
    expect(legend).toBeNull();
  });

  it('shows required asterisk', async () => {
    const page = await newSpecPage({
      components: [CcRadioGroup, CcRadio],
      html: `<cc-radio-group name="test" label="Pick one" required></cc-radio-group>`,
    });

    const asterisk = page.root!.shadowRoot!.querySelector('.cc-radio-group__required');
    expect(asterisk).not.toBeNull();
  });

  it('shows error message', async () => {
    const page = await newSpecPage({
      components: [CcRadioGroup, CcRadio],
      html: `<cc-radio-group name="test" error="Required"></cc-radio-group>`,
    });

    const error = page.root!.shadowRoot!.querySelector('.cc-radio-group__message--error');
    expect(error!.textContent).toBe('Required');
  });

  it('shows hint when no error', async () => {
    const page = await newSpecPage({
      components: [CcRadioGroup, CcRadio],
      html: `<cc-radio-group name="test" hint="Pick the best option"></cc-radio-group>`,
    });

    const hint = page.root!.shadowRoot!.querySelector('.cc-radio-group__message--hint');
    expect(hint!.textContent).toBe('Pick the best option');
  });

  it('hides hint when error is present', async () => {
    const page = await newSpecPage({
      components: [CcRadioGroup, CcRadio],
      html: `<cc-radio-group name="test" hint="Hint" error="Error"></cc-radio-group>`,
    });

    const hint = page.root!.shadowRoot!.querySelector('.cc-radio-group__message--hint');
    expect(hint).toBeNull();
  });

  it('applies disabled class when disabled', async () => {
    const page = await newSpecPage({
      components: [CcRadioGroup, CcRadio],
      html: `<cc-radio-group name="test" disabled></cc-radio-group>`,
    });

    const fieldset = page.root!.shadowRoot!.querySelector('fieldset');
    expect(fieldset!.classList.contains('cc-radio-group--disabled')).toBe(true);
    expect(fieldset!.disabled).toBe(true);
  });

  it('applies error class when error is present', async () => {
    const page = await newSpecPage({
      components: [CcRadioGroup, CcRadio],
      html: `<cc-radio-group name="test" error="Oops"></cc-radio-group>`,
    });

    const fieldset = page.root!.shadowRoot!.querySelector('fieldset');
    expect(fieldset!.classList.contains('cc-radio-group--error')).toBe(true);
  });
});

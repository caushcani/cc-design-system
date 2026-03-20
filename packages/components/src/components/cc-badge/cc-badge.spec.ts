import { newSpecPage } from '@stencil/core/testing';
import { CcBadge } from './cc-badge';

describe('cc-badge', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [CcBadge],
      html: `<cc-badge>Label</cc-badge>`,
    });

    const badge = page.root!.shadowRoot!.querySelector('.cc-badge');
    expect(badge).not.toBeNull();
    expect(badge!.textContent).toBe('Label');
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [CcBadge],
      html: `<cc-badge variant="success">OK</cc-badge>`,
    });

    const badge = page.root!.shadowRoot!.querySelector('.cc-badge');
    expect(badge!.classList.contains('cc-badge--success')).toBe(true);
  });

  it('defaults to neutral variant', async () => {
    const page = await newSpecPage({
      components: [CcBadge],
      html: `<cc-badge>Label</cc-badge>`,
    });

    const badge = page.root!.shadowRoot!.querySelector('.cc-badge');
    expect(badge!.classList.contains('cc-badge--neutral')).toBe(true);
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [CcBadge],
      html: `<cc-badge size="sm">Label</cc-badge>`,
    });

    const badge = page.root!.shadowRoot!.querySelector('.cc-badge');
    expect(badge!.classList.contains('cc-badge--sm')).toBe(true);
    expect(badge!.classList.contains('cc-badge--md')).toBe(false);
  });

  it('applies pill class when pill is set', async () => {
    const page = await newSpecPage({
      components: [CcBadge],
      html: `<cc-badge pill>Label</cc-badge>`,
    });

    const badge = page.root!.shadowRoot!.querySelector('.cc-badge');
    expect(badge!.classList.contains('cc-badge--pill')).toBe(true);
  });

  it('does not apply pill class by default', async () => {
    const page = await newSpecPage({
      components: [CcBadge],
      html: `<cc-badge>Label</cc-badge>`,
    });

    const badge = page.root!.shadowRoot!.querySelector('.cc-badge');
    expect(badge!.classList.contains('cc-badge--pill')).toBe(false);
  });

  it('applies solid class when soft is false', async () => {
    const page = await newSpecPage({
      components: [CcBadge],
      html: `<cc-badge soft="false">Label</cc-badge>`,
    });

    const badge = page.root!.shadowRoot!.querySelector('.cc-badge');
    expect(badge!.classList.contains('cc-badge--solid')).toBe(true);
  });

  it('does not apply solid class when soft is true (default)', async () => {
    const page = await newSpecPage({
      components: [CcBadge],
      html: `<cc-badge>Label</cc-badge>`,
    });

    const badge = page.root!.shadowRoot!.querySelector('.cc-badge');
    expect(badge!.classList.contains('cc-badge--solid')).toBe(false);
  });

  it('renders all variants without error', async () => {
    const variants = ['primary', 'success', 'warning', 'danger', 'neutral'];

    for (const variant of variants) {
      const page = await newSpecPage({
        components: [CcBadge],
        html: `<cc-badge variant="${variant}">${variant}</cc-badge>`,
      });

      const badge = page.root!.shadowRoot!.querySelector('.cc-badge');
      expect(badge!.classList.contains(`cc-badge--${variant}`)).toBe(true);
    }
  });
});

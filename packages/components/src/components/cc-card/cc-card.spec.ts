import { newSpecPage } from '@stencil/core/testing';
import { CcCard } from './cc-card';

describe('cc-card', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [CcCard],
      html: `<cc-card></cc-card>`,
    });

    const card = page.root!.shadowRoot!.querySelector('.cc-card');
    expect(card).not.toBeNull();
    expect(card!.classList.contains('cc-card--elevated')).toBe(true);
    expect(card!.classList.contains('cc-card--padding-md')).toBe(true);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [CcCard],
      html: `<cc-card variant="outlined"></cc-card>`,
    });

    const card = page.root!.shadowRoot!.querySelector('.cc-card');
    expect(card!.classList.contains('cc-card--outlined')).toBe(true);
    expect(card!.classList.contains('cc-card--elevated')).toBe(false);
  });

  it('applies flat variant class', async () => {
    const page = await newSpecPage({
      components: [CcCard],
      html: `<cc-card variant="flat"></cc-card>`,
    });

    const card = page.root!.shadowRoot!.querySelector('.cc-card');
    expect(card!.classList.contains('cc-card--flat')).toBe(true);
  });

  it('applies padding class', async () => {
    const page = await newSpecPage({
      components: [CcCard],
      html: `<cc-card padding="lg"></cc-card>`,
    });

    const card = page.root!.shadowRoot!.querySelector('.cc-card');
    expect(card!.classList.contains('cc-card--padding-lg')).toBe(true);
    expect(card!.classList.contains('cc-card--padding-md')).toBe(false);
  });

  it('applies no-padding class', async () => {
    const page = await newSpecPage({
      components: [CcCard],
      html: `<cc-card padding="none"></cc-card>`,
    });

    const card = page.root!.shadowRoot!.querySelector('.cc-card');
    expect(card!.classList.contains('cc-card--padding-none')).toBe(true);
  });

  it('does not apply clickable class by default', async () => {
    const page = await newSpecPage({
      components: [CcCard],
      html: `<cc-card></cc-card>`,
    });

    const card = page.root!.shadowRoot!.querySelector('.cc-card');
    expect(card!.classList.contains('cc-card--clickable')).toBe(false);
    expect(card!.getAttribute('tabindex')).toBeNull();
    expect(card!.getAttribute('role')).toBeNull();
  });

  it('applies clickable class and accessibility attrs when clickable', async () => {
    const page = await newSpecPage({
      components: [CcCard],
      html: `<cc-card clickable></cc-card>`,
    });

    const card = page.root!.shadowRoot!.querySelector('.cc-card');
    expect(card!.classList.contains('cc-card--clickable')).toBe(true);
    expect(card!.getAttribute('tabindex')).toBe('0');
    expect(card!.getAttribute('role')).toBe('button');
  });

  it('renders inner body wrapper', async () => {
    const page = await newSpecPage({
      components: [CcCard],
      html: `<cc-card></cc-card>`,
    });

    const body = page.root!.shadowRoot!.querySelector('.cc-card__body');
    expect(body).not.toBeNull();
  });

  it('renders inner wrapper', async () => {
    const page = await newSpecPage({
      components: [CcCard],
      html: `<cc-card></cc-card>`,
    });

    const inner = page.root!.shadowRoot!.querySelector('.cc-card__inner');
    expect(inner).not.toBeNull();
  });
});

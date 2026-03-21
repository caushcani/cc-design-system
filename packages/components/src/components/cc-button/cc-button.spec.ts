import { newSpecPage } from '@stencil/core/testing';
import { CcButton } from './cc-button';

describe('cc-button', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [CcButton],
      html: `<cc-button>Click me</cc-button>`,
    });

    const button = page.root!.shadowRoot!.querySelector('button');
    expect(button).not.toBeNull();
    expect(button!.classList.contains('cc-button--solid')).toBe(true);
    expect(button!.classList.contains('cc-button--md')).toBe(true);
    expect(button!.hasAttribute('disabled')).toBe(false);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [CcButton],
      html: `<cc-button variant="outline">Click me</cc-button>`,
    });

    const button = page.root!.shadowRoot!.querySelector('button');
    expect(button!.classList.contains('cc-button--outline')).toBe(true);
    expect(button!.classList.contains('cc-button--solid')).toBe(false);
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [CcButton],
      html: `<cc-button size="lg">Click me</cc-button>`,
    });

    const button = page.root!.shadowRoot!.querySelector('button');
    expect(button!.classList.contains('cc-button--lg')).toBe(true);
    expect(button!.classList.contains('cc-button--md')).toBe(false);
  });

  it('disables the button when disabled prop is set', async () => {
    const page = await newSpecPage({
      components: [CcButton],
      html: `<cc-button disabled>Click me</cc-button>`,
    });

    const button = page.root!.shadowRoot!.querySelector('button');
    expect(button!.hasAttribute('disabled')).toBe(true);
    expect(button!.getAttribute('aria-disabled')).toBe('true');
  });

  it('sets button type attribute', async () => {
    const page = await newSpecPage({
      components: [CcButton],
      html: `<cc-button type="submit">Submit</cc-button>`,
    });

    const button = page.root!.shadowRoot!.querySelector('button');
    expect(button!.type).toBe('submit');
  });

  it('defaults to type=button', async () => {
    const page = await newSpecPage({
      components: [CcButton],
      html: `<cc-button>Click me</cc-button>`,
    });

    const button = page.root!.shadowRoot!.querySelector('button');
    expect(button!.type).toBe('button');
  });
});

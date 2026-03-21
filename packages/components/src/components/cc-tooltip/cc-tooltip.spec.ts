import { newSpecPage } from '@stencil/core/testing';
import { CcTooltip } from './cc-tooltip';

describe('cc-tooltip', () => {
  afterEach(() => jest.useRealTimers());
  it('renders the trigger slot', async () => {
    const page = await newSpecPage({
      components: [CcTooltip],
      html: `<cc-tooltip content="Hello"><button>Hover</button></cc-tooltip>`,
    });

    const trigger = page.root!.shadowRoot!.querySelector('.cc-tooltip__trigger');
    expect(trigger).not.toBeNull();
  });

  it('renders the tooltip element', async () => {
    const page = await newSpecPage({
      components: [CcTooltip],
      html: `<cc-tooltip content="Tip text"><button>Hover</button></cc-tooltip>`,
    });

    const tooltip = page.root!.shadowRoot!.querySelector('.cc-tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip!.textContent).toContain('Tip text');
  });

  it('is hidden by default', async () => {
    const page = await newSpecPage({
      components: [CcTooltip],
      html: `<cc-tooltip content="Hidden"><button>Hover</button></cc-tooltip>`,
    });

    const tooltip = page.root!.shadowRoot!.querySelector('.cc-tooltip');
    expect(tooltip!.classList.contains('cc-tooltip--visible')).toBe(false);
    expect(tooltip!.getAttribute('aria-hidden')).toBe('true');
  });

  it('becomes visible on mouseenter', async () => {
    const page = await newSpecPage({
      components: [CcTooltip],
      html: `<cc-tooltip content="Show me"><button>Hover</button></cc-tooltip>`,
    });

    const trigger = page.root!.shadowRoot!.querySelector('.cc-tooltip__trigger') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await page.waitForChanges();

    const tooltip = page.root!.shadowRoot!.querySelector('.cc-tooltip');
    expect(tooltip!.classList.contains('cc-tooltip--visible')).toBe(true);
    expect(tooltip!.getAttribute('aria-hidden')).toBeNull();
  });

  it('becomes visible on focus', async () => {
    const page = await newSpecPage({
      components: [CcTooltip],
      html: `<cc-tooltip content="Focus tip"><button>Focus</button></cc-tooltip>`,
    });

    const trigger = page.root!.shadowRoot!.querySelector('.cc-tooltip__trigger') as HTMLElement;
    trigger.dispatchEvent(new FocusEvent('focus'));
    await page.waitForChanges();

    const tooltip = page.root!.shadowRoot!.querySelector('.cc-tooltip');
    expect(tooltip!.classList.contains('cc-tooltip--visible')).toBe(true);
  });

  it('hides on mouseleave', async () => {
    const page = await newSpecPage({
      components: [CcTooltip],
      html: `<cc-tooltip content="Bye"><button>Hover</button></cc-tooltip>`,
    });

    const trigger = page.root!.shadowRoot!.querySelector('.cc-tooltip__trigger') as HTMLElement;

    // Show with real timers so waitForChanges doesn't hang
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await page.waitForChanges();

    // Only fake timers for the hide delay
    jest.useFakeTimers();
    trigger.dispatchEvent(new MouseEvent('mouseleave'));
    jest.advanceTimersByTime(200);
    jest.useRealTimers();
    await page.waitForChanges();

    const tooltip = page.root!.shadowRoot!.querySelector('.cc-tooltip');
    expect(tooltip!.classList.contains('cc-tooltip--visible')).toBe(false);
  });

  it('does not show when disabled', async () => {
    const page = await newSpecPage({
      components: [CcTooltip],
      html: `<cc-tooltip content="Disabled tip" disabled><button>Hover</button></cc-tooltip>`,
    });

    const trigger = page.root!.shadowRoot!.querySelector('.cc-tooltip__trigger') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await page.waitForChanges();

    const tooltip = page.root!.shadowRoot!.querySelector('.cc-tooltip');
    expect(tooltip!.classList.contains('cc-tooltip--visible')).toBe(false);
  });

  it('does not show when content is empty', async () => {
    const page = await newSpecPage({
      components: [CcTooltip],
      html: `<cc-tooltip content=""><button>Hover</button></cc-tooltip>`,
    });

    const trigger = page.root!.shadowRoot!.querySelector('.cc-tooltip__trigger') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await page.waitForChanges();

    const tooltip = page.root!.shadowRoot!.querySelector('.cc-tooltip');
    expect(tooltip!.classList.contains('cc-tooltip--visible')).toBe(false);
  });

  it('applies placement class', async () => {
    for (const placement of ['top', 'bottom', 'left', 'right'] as const) {
      const page = await newSpecPage({
        components: [CcTooltip],
        html: `<cc-tooltip content="Tip" placement="${placement}"><button>T</button></cc-tooltip>`,
      });

      const tooltip = page.root!.shadowRoot!.querySelector('.cc-tooltip');
      expect(tooltip!.classList.contains(`cc-tooltip--${placement}`)).toBe(true);
    }
  });

  it('sets aria-describedby on trigger when visible', async () => {
    const page = await newSpecPage({
      components: [CcTooltip],
      html: `<cc-tooltip content="Describe"><button>T</button></cc-tooltip>`,
    });

    const trigger = page.root!.shadowRoot!.querySelector('.cc-tooltip__trigger') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await page.waitForChanges();

    expect(trigger.getAttribute('aria-describedby')).not.toBeNull();
  });

  it('renders the arrow element', async () => {
    const page = await newSpecPage({
      components: [CcTooltip],
      html: `<cc-tooltip content="Arrow"><button>T</button></cc-tooltip>`,
    });

    const arrow = page.root!.shadowRoot!.querySelector('.cc-tooltip__arrow');
    expect(arrow).not.toBeNull();
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CcTabs } from './cc-tabs';
import { CcTab } from '../cc-tab/cc-tab';
import { CcTabPanel } from '../cc-tab-panel/cc-tab-panel';

describe('cc-tabs', () => {
  it('renders tablist and panels wrapper', async () => {
    const page = await newSpecPage({
      components: [CcTabs, CcTab, CcTabPanel],
      html: `<cc-tabs></cc-tabs>`,
    });

    expect(page.root!.shadowRoot!.querySelector('[role="tablist"]')).not.toBeNull();
    expect(page.root!.shadowRoot!.querySelector('.cc-tabs__panels')).not.toBeNull();
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [CcTabs, CcTab, CcTabPanel],
      html: `<cc-tabs variant="pills"></cc-tabs>`,
    });

    const tabs = page.root!.shadowRoot!.querySelector('.cc-tabs');
    expect(tabs!.classList.contains('cc-tabs--pills')).toBe(true);
  });

  it('defaults to line variant', async () => {
    const page = await newSpecPage({
      components: [CcTabs, CcTab, CcTabPanel],
      html: `<cc-tabs></cc-tabs>`,
    });

    const tabs = page.root!.shadowRoot!.querySelector('.cc-tabs');
    expect(tabs!.classList.contains('cc-tabs--line')).toBe(true);
  });

  it('activates the correct tab and panel based on value', async () => {
    const page = await newSpecPage({
      components: [CcTabs, CcTab, CcTabPanel],
      html: `
        <cc-tabs value="b">
          <cc-tab slot="tabs" value="a">A</cc-tab>
          <cc-tab slot="tabs" value="b">B</cc-tab>
          <cc-tab-panel value="a">Panel A</cc-tab-panel>
          <cc-tab-panel value="b">Panel B</cc-tab-panel>
        </cc-tabs>
      `,
    });

    await page.waitForChanges();

    const tabs = Array.from(page.root!.querySelectorAll('cc-tab')) as any[];
    const panels = Array.from(page.root!.querySelectorAll('cc-tab-panel')) as any[];

    expect(tabs[0].active).toBe(false);
    expect(tabs[1].active).toBe(true);
    expect(panels[0].active).toBe(false);
    expect(panels[1].active).toBe(true);
  });

  it('emits ccChange when a tab is selected', async () => {
    const page = await newSpecPage({
      components: [CcTabs, CcTab, CcTabPanel],
      html: `
        <cc-tabs value="a">
          <cc-tab slot="tabs" value="a">A</cc-tab>
          <cc-tab slot="tabs" value="b">B</cc-tab>
        </cc-tabs>
      `,
    });

    const spy = jest.fn();
    page.root!.addEventListener('ccChange', spy);

    const tabs = Array.from(page.root!.querySelectorAll('cc-tab')) as any[];
    tabs[1].dispatchEvent(new CustomEvent('ccTabSelect', { detail: 'b', bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe('b');
  });
});

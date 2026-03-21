import { newSpecPage } from '@stencil/core/testing';
import { CcTabPanel } from './cc-tab-panel';

describe('cc-tab-panel', () => {
  it('renders with role tabpanel', async () => {
    const page = await newSpecPage({
      components: [CcTabPanel],
      html: `<cc-tab-panel value="a">Content</cc-tab-panel>`,
    });

    expect(page.root!.getAttribute('role')).toBe('tabpanel');
  });

  it('is hidden by default', async () => {
    const page = await newSpecPage({
      components: [CcTabPanel],
      html: `<cc-tab-panel value="a">Content</cc-tab-panel>`,
    });

    expect(page.root!.hidden).toBe(true);
  });

  it('is visible when active', async () => {
    const page = await newSpecPage({
      components: [CcTabPanel],
      html: `<cc-tab-panel value="a" active>Content</cc-tab-panel>`,
    });

    expect(page.root!.hidden).toBe(false);
  });

  it('renders panel content', async () => {
    const page = await newSpecPage({
      components: [CcTabPanel],
      html: `<cc-tab-panel value="a" active>Panel content here</cc-tab-panel>`,
    });

    const panel = page.root!.shadowRoot!.querySelector('.cc-tab-panel');
    expect(panel).not.toBeNull();
  });
});

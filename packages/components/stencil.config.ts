import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'cc-design-system',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      exportsCondition: 'module',
    },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
  plugins: [sass()],
  testing: {
    browserHeadless: 'new',
  },
};

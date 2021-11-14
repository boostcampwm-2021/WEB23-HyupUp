const path = require('path');
module.exports = {
  stories: ['../src/stories/*.stories.mdx', '../src/stories/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, '../src'),
      '@public': path.resolve(__dirname, '../public'),
    };

    return config;
  },
};

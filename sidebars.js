const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Helper function to generate items dynamically
function generateSidebarItems(dir) {
  return glob.sync(`${dir}/**/index.md`).map((file) => {
    const relativePath = path.relative('docs', file).replace(/\\/g, '/');
    return relativePath.replace(/\.md$/, '');
  });
}

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  dev: [
    'dev/index',
    {
      type: 'category',
      label: 'React',
      items: generateSidebarItems('docs/dev/React'),
    },
    {
      type: 'category',
      label: 'SICP',
      items: generateSidebarItems('docs/dev/SICP'),
    },
    {
      type: 'category',
      label: 'CSS',
      items: generateSidebarItems('docs/dev/CSS'),
    },
    {
      type: 'category',
      label: 'C',
      items: generateSidebarItems('docs/dev/C'),
    },
  ],
};

module.exports = sidebars;

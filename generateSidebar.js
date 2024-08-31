// generateSidebar.js

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function generateSidebarItems(dir) {
  return glob.sync(`${dir}/**/index.md`).map((file) => {
    const relativePath = path.relative('docs', file).replace(/\\/g, '/');
    return relativePath.replace(/\.md$/, '');
  });
}

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

// 동적으로 생성된 사이드바를 JSON 파일로 저장
fs.writeFileSync('sidebars.json', JSON.stringify(sidebars, null, 2));

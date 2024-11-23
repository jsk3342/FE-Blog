// generateSidebar.js

const fs = require('fs');
const path = require('path');

// 유틸리티 함수: 폴더 이름이 두 글자로 숫자로 시작하는지 확인
function startsWithTwoDigits(folderName) {
  return /^\d{2}/.test(folderName);
}

// 사이드바 아이템을 재귀적으로 생성하는 함수
function generateSidebarItems(dir) {
  const items = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative('docs', fullPath).replace(/\\/g, '/');
    const withoutExtension = relativePath.replace(/\.mdx?$/, ''); // .md와 .mdx 모두 처리

    if (entry.isFile() && (entry.name === 'index.md' || entry.name === 'index.mdx') && dir === 'docs/dev') {
      return;
    }

    if (entry.isDirectory()) {
      if (!startsWithTwoDigits(entry.name)) {
        // 폴더 이름이 두 글자로 시작하지 않으면 카테고리로 처리
        const subItems = generateSidebarItems(fullPath);
        if (subItems.length > 0) {
          items.push({
            type: 'category',
            label: entry.name.replace(/^\d+[-_]/, ''), // 숫자 및 구분자 제거
            items: subItems,
          });
        }
      } else {
        // 폴더 이름이 두 글자로 숫자로 시작하면 해당 폴더의 index.md 또는 index.mdx를 아이템으로 추가
        const indexFile = path.join(fullPath, 'index.mdx'); // .mdx로 변경
        const indexFileMd = path.join(fullPath, 'index.md'); // .md도 처리
        if (fs.existsSync(indexFile)) {
          const itemPath = indexFile.replace(/\.mdx$/, '').replace(/\\/g, '/');
          items.push(itemPath.replace(/^docs\//, ''));
        } else if (fs.existsSync(indexFileMd)) {
          const itemPath = indexFileMd.replace(/\.md$/, '').replace(/\\/g, '/');
          items.push(itemPath.replace(/^docs\//, ''));
        }
      }
    } else if (entry.isFile() && (entry.name === 'index.md' || entry.name === 'index.mdx')) {
      // index.md와 index.mdx 모두 처리
      items.push(withoutExtension);
    }
  });

  // 알파벳 순으로 정렬 (선택 사항)
  items.sort();

  return items;
}

const sidebars = {
  dev: [
    'dev/index',
    ...generateSidebarItems('docs/dev'), // 'docs/dev' 내의 모든 폴더와 파일을 처리
  ],
};

// 동적으로 생성된 사이드바를 JSON 파일로 저장
fs.writeFileSync('sidebars.json', JSON.stringify(sidebars, null, 2));

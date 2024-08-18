const fs = require('fs');
const path = require('path');

function generateSidebarItems(dir) {
  const fullDirPath = path.resolve(__dirname, 'blog', dir);
  console.log(fullDirPath);

  if (!fs.existsSync(fullDirPath)) {
    console.log(`Directory not found: ${fullDirPath}`);
    return [];
  }

  const items = fs
    .readdirSync(fullDirPath)
    .filter((file) => {
      // 디렉토리인지 확인
      const filePath = path.join(fullDirPath, file);
      return fs.lstatSync(filePath).isDirectory();
    })
    .map((folder) => {
      // 각 하위 디렉토리 내의 index.md 파일을 참조
      const indexFilePath = path.join(dir, folder, 'index.md');
      if (fs.existsSync(path.resolve(__dirname, 'blog', indexFilePath))) {
        // index.md 파일이 존재하면 경로 반환
        const itemPath = path.join(dir, folder, 'index.md').replace(/\\/g, '/');
        console.log(`Generated item path: ${itemPath}`);
        return itemPath;
      }
      return null;
    })
    .filter(Boolean); // null 값 필터링

  console.log(`Items: ${items}`);
  return items.length > 0 ? items : [];
}

const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'C',
      items: generateSidebarItems('C'),
    },
    {
      type: 'category',
      label: 'React',
      items: generateSidebarItems('React'),
    },
    {
      type: 'category',
      label: 'SICP 자바스크립트',
      items: generateSidebarItems('SICP'),
    },
  ].filter((category) => category.items.length > 0), // 빈 카테고리 필터링
};

module.exports = sidebars;

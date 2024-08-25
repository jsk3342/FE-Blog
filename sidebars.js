const fs = require('fs');
const path = require('path');

// 디렉토리에 있는 파일 이름 배열을 반환함.
const getFilesOf = (dir) =>
  fs
    .readdirSync(dir)
    .filter((fileName) => fileName.includes('.'))
    .map((fileName) => path.parse(fileName).name);

// 디렉토리에 있는 디렉토리 목록을 반환함.
const getDirectoriesOf = (dir) => fs.readdirSync(dir).filter((dirName) => !dirName.includes('.'));

// docs 디렉토리에 있는 카테고리
const categories = getDirectoriesOf('docs');

// 카테고리를 받아서 하위 카테고리의 목록을 반환하는 함수
const getSubCategories = (category) => getDirectoriesOf(`docs/${category}`);

const removePriority = (subCategory) => {
  // 예를 들어, '01-sub-category' -> 'sub-category'로 변환하는 간단한 로직
  return subCategory.replace(/^\d+-/, '');
};

// 서브 카테고리 레이블을 설정하는 객체
const SUB_CATEGORY_SLUGS = {
  'sub-category-1': 'Tutorial - Basics',
  'sub-category-2': 'Tutorial - Extras',
  'another-sub-category': 'Another Sub Category',
};

// 서브 카테고리 파일들을 Docusaurus의 중첩된 사이드바로 구성
const createSubCategoryItem = (category, subCategory) => ({
  type: 'category',
  label: SUB_CATEGORY_SLUGS[removePriority(subCategory)],
  items: getFilesOf(`docs/${category}/${subCategory}`).map((fileName) => `${category}/${subCategory}/${fileName}`),
});

// 카테고리 별로 서브 카테고리의 중첩된 사이드바를 구성
module.exports = categories.reduce(
  (sidebars, category) => ({
    ...sidebars,
    [category]: getSubCategories(category).map((subCategory) => createSubCategoryItem(category, subCategory)),
  }),
  {},
);

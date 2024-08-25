import React from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import Comment from '@site/src/components/HomepageFeatures/Comment';

export default function BlogPostPageWrapper(props) {
  return (
    <>
      <BlogPostPage {...props} />
    </>
  );
}

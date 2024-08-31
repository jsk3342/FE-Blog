import React from 'react';
import DocItem from '@theme-original/DocItem';
import { DiscussionEmbed } from 'disqus-react';

export default function DocItemWrapper(props) {
  return (
    <>
      <DocItem {...props} />
      <DocItemContentWithComments {...props} />
    </>
  );
}

function DocItemContentWithComments(props) {
  const { metadata } = props.content;
  const { permalink, title } = metadata;

  const disqusShortname = 'fe-tech-2'; 
  const disqusConfig = {
    url: window.location.href,
    identifier: permalink,
    title: title,
  };

  return (
    <div id="disqus_thread" style={{ marginTop: '2rem' }}>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}

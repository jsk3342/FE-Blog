import React, { useEffect, useState } from 'react';
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

  const [disqusConfig, setDisqusConfig] = useState(null);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    setDisqusConfig({
      url: window.location.href,
      identifier: permalink,
      title: title,
    });
  }, [permalink, title]);

  if (!disqusConfig) {
    return null; // 아직 설정되지 않았으면 아무것도 렌더링하지 않음
  }

  return (
    <div id="disqus_thread" style={{ marginTop: '2rem' }}>
      <DiscussionEmbed shortname="fe-tech-2" config={disqusConfig} />
    </div>
  );
}

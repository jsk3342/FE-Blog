import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '개발',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: <>생활속에서 필요한 가치를 찾아내고, 문제를 정의하고, 해결하는 개발자 입니다.</>,
  },
  {
    title: '기록',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: <>지나온 시간들의 기록과 앞으로 같은 길을 가려는 사람들을 위한 기록을 남깁니다.</>,
  },
  {
    title: '함께 자라기',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: <>혼자만의 성장이 아닌 공유를 통하여 함께 자라기를 추구합니다. 지식의 가치는 나눌수록 거대해집니다.</>,
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

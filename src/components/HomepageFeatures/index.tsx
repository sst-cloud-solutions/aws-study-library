import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Structured Learning',
    Svg: require('@site/static/img/structured-learning.svg').default,
    description: (
      <>
        Move through core AWS topics in the ideal order — from foundational to advanced
      </>
    ),
  },
  {
    title: 'Exam-Focused Topics',
    Svg: require('@site/static/img/aws-solution-architect-pro.svg').default,
    description: (
      <>
        Every topic is curated to align with the AWS Certified Solutions Architect – Professional exam domains.
      </>
    ),
  },
  {
    title: 'Comprehensive Coverage',
    Svg: require('@site/static/img/comprehensive-coverage.svg').default,
    description: (
      <>
        From core services to advanced architecture patterns, everything you need to master AWS is in one place.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className="col col--4">
      <div className={styles.featureCard}>
        <Svg className={styles.featureSvg} role="img" />
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDesc}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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

import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  ctaText: string;
  ctaLink: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '00 / IT Foundation',
    Svg: require('@site/static/img/structured-learning.svg').default,
    description: (
      <>
        The absolute baseline. Build comfort in Linux systems administration, TCP/IP networking, programming logic, database schemas, and core security principles before entering cloud platforms.
      </>
    ),
    ctaText: 'Begin Study',
    ctaLink: '/docs/it-foundation/beginner-roadmap',
  },
  {
    title: '01 / Developer Associate',
    Svg: require('@site/static/img/comprehensive-coverage.svg').default,
    description: (
      <>
        Serverless and operations. Deep dive into AWS Lambda concurrency models, DynamoDB capacity calculations, Docker container orchestrations, and automated CI/CD delivery pipelines.
      </>
    ),
    ctaText: 'Access Library',
    ctaLink: '/docs/developer-associate/dva-roadmap',
  },
  {
    title: '02 / Solutions Architect Professional',
    Svg: require('@site/static/img/aws-solution-architect-pro.svg').default,
    description: (
      <>
        Advanced cloud designs. Master complex multi-account governance structures, hybrid connectivity routing, global traffic management, and multi-region disaster recovery systems.
      </>
    ),
    ctaText: 'Access Library',
    ctaLink: '/docs/solutions-architect-professional/sap-roadmap',
  },
];

function Feature({title, Svg, description, ctaText, ctaLink}: FeatureItem) {
  return (
    <div className="col col--4">
      <div className={styles.featureCard}>
        <Svg className={styles.featureSvg} role="img" />
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDesc}>{description}</p>
        <Link className={styles.cardButton} to={ctaLink}>
          {ctaText}
        </Link>
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

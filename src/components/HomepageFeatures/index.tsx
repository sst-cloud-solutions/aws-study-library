import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  imgSrc?: string;
  description: ReactNode;
  ctaText: string;
  ctaLink: string;
  colClass?: string;
};

const CoreTracksList: FeatureItem[] = [
  {
    title: '00 / IT Foundation',
    imgSrc: require('@site/static/img/it-foundation-badge.png').default,
    description: (
      <>
        The absolute baseline. Build comfort in Linux systems administration, TCP/IP networking, programming logic, database schemas, and core security principles before entering cloud platforms.
      </>
    ),
    ctaText: 'Begin Study',
    ctaLink: '/docs/it-foundation/beginner-roadmap',
    colClass: 'col col--4',
  },
  {
    title: '01 / AI Practitioner',
    imgSrc: require('@site/static/img/aif-badge.png').default,
    description: (
      <>
        Foundational AI/ML & Generative AI on AWS. Master Amazon Bedrock, prompt engineering, Amazon Q, AWS managed AI services (Comprehend, Rekognition), and SageMaker workflows.
      </>
    ),
    ctaText: 'Access Library',
    ctaLink: '/docs/ai-practitioner/aif-roadmap',
    colClass: 'col col--4',
  },
  {
    title: '02 / Developer Associate',
    imgSrc: require('@site/static/img/dva-badge.png').default,
    description: (
      <>
        Serverless development and operations. Deep dive into AWS Lambda concurrency models, DynamoDB capacity calculations, API Gateway integration, and automated CI/CD delivery pipelines.
      </>
    ),
    ctaText: 'Access Library',
    ctaLink: '/docs/developer-associate/dva-roadmap',
    colClass: 'col col--4',
  },
  {
    title: '03 / Solutions Architect Associate',
    imgSrc: require('@site/static/img/saa-badge.png').default,
    description: (
      <>
        Core cloud architecture designs. Focus on building highly resilient, secure, high-performing, and cost-optimized workloads across core AWS services, matching the SAA-C03 domains.
      </>
    ),
    ctaText: 'Access Library',
    ctaLink: '/docs/solutions-architect-associate/saa-roadmap',
    colClass: 'col col--6',
  },
  {
    title: '04 / Solutions Architect Professional',
    Svg: require('@site/static/img/aws-solution-architect-pro.svg').default,
    description: (
      <>
        Advanced enterprise-scale designs. Master complex multi-account governance (Landing Zones), hybrid network connectivity, migration strategies, global traffic routing, and disaster recovery systems.
      </>
    ),
    ctaText: 'Access Library',
    ctaLink: '/docs/solutions-architect-professional/sap-roadmap',
    colClass: 'col col--6',
  },
];

const SpecializedList: FeatureItem[] = [
  {
    title: 'Decision Matrices',
    Svg: require('@site/static/img/structured-learning.svg').default,
    description: (
      <>
        Technical side-by-side comparison matrices to help you evaluate and choose the right AWS services for compute, databases, serverless, storage, integration, and networking.
      </>
    ),
    ctaText: 'Compare Services',
    ctaLink: '/docs/architecture-decision-frameworks/alb-vs-nlb-vs-gwlb',
    colClass: 'col col--6',
  },
  {
    title: 'Architecture Workshops',
    Svg: require('@site/static/img/comprehensive-coverage.svg').default,
    description: (
      <>
        Hands-on design scenarios and deployment blueprints covering enterprise Landing Zones, hybrid networks, multi-region disaster recovery, and global SaaS application layouts.
      </>
    ),
    ctaText: 'Start Workshops',
    ctaLink: '/docs/architecture-workshops/enterprise-landing-zone',
    colClass: 'col col--6',
  },
];

function Feature({title, Svg, imgSrc, description, ctaText, ctaLink, colClass = 'col col--4'}: FeatureItem) {
  return (
    <div className={clsx(colClass)}>
      <div className={styles.featureCard}>
        {Svg && <Svg className={styles.featureSvg} role="img" />}
        {imgSrc && <img src={imgSrc} className={styles.featureImg} alt={title} />}
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
        {/* Core Tracks Section */}
        <Heading as="h2" className={styles.sectionTitle}>
          AWS Certification & Mastery Tracks
        </Heading>
        
        {/* Row 1: IT Foundation, AI Practitioner, Developer Associate (col--4) */}
        <div className="row">
          {CoreTracksList.slice(0, 3).map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        
        {/* Row 2: Solutions Architect Associate, Solutions Architect Professional (col--6) */}
        <div className="row" style={{ marginTop: '2rem', justifyContent: 'center' }}>
          {CoreTracksList.slice(3).map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>

        <hr className={styles.divider} />

        {/* Specialized Resources Section */}
        <Heading as="h2" className={styles.sectionTitle}>
          Architectural Frameworks & Practical Blueprints
        </Heading>
        <div className="row">
          {SpecializedList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

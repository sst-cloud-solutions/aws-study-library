import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          The AWS Study Library
        </Heading>
        <p className={styles.heroSubtitle}>
          A premium, structured reading environment for mastering AWS cloud engineering and architecture.
          Transition from IT foundations to advanced certifications.
        </p>
        <div className={styles.buttons}>
          <Link
            className={styles.primaryButton}
            to="/docs/it-foundation/beginner-roadmap">
            Start IT Foundations
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="AWS Study Library | Master AWS cloud engineering and architecture - IT foundations to advanced certifications">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

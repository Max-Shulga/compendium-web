import Link from 'next/link';

import { ROUTES } from '@/core/constants/routes.constant';

import { HOME_RECENT_TOPICS_LIMIT } from './constants/home.constant';
import classes from './Home.module.css';
import type { THome } from './models/home.model';

const Home = ({ topics }: THome) => {
  const recentTopics = [...topics]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, HOME_RECENT_TOPICS_LIMIT);

  return (
    <div className={classes.page}>
      <section className={classes.hero}>
        <h1 className={classes.heroTitle}>A place to keep what you&apos;ve learned.</h1>
        <p className={classes.heroSubtitle}>
          Compendium holds the topics and materials you&apos;ve saved so far.
        </p>
        <div className={classes.heroActions}>
          <Link
            className={`${classes.heroLink} ${classes.heroLinkTopics}`}
            href={ROUTES.topics.list}
          >
            Browse topics
          </Link>
          <Link
            className={`${classes.heroLink} ${classes.heroLinkCategories}`}
            href={ROUTES.categories.list}
          >
            Browse categories
          </Link>
        </div>
      </section>

      <section className={classes.recentSection}>
        <div className={classes.sectionHeader}>
          <span className={classes.sectionLabel}>Recently updated</span>
        </div>
        {recentTopics.length === 0 ? (
          <p className={classes.empty}>
            No topics yet.{' '}
            <Link className={classes.emptyLink} href={ROUTES.topics.new}>
              Create your first one
            </Link>
            .
          </p>
        ) : (
          <div className={classes.list}>
            {recentTopics.map((topic) => (
              <Link
                className={classes.topicCard}
                href={ROUTES.topics.detail(topic.id)}
                key={topic.id}
              >
                <div className={classes.topicMeta}>
                  <span className={classes.topicName}>{topic.name}</span>
                  <span className={classes.topicDate}>
                    {new Date(topic.updatedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                {topic.description && (
                  <p className={classes.topicDescription}>{topic.description}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

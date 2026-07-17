import { Title } from '@mantine/core';

import type { TProfileView } from './models/profile-view.model';
import styles from './ProfileView.module.css';

const ProfileView = ({ email, role }: TProfileView) => (
  <main className={styles.page}>
    <span className={styles.eyebrow}>Account</span>
    <Title order={1} style={{ fontWeight: 400 }}>Profile</Title>

    <dl className={styles.fields}>
      <div className={styles.field}>
        <dt className={styles.label}>Email</dt>
        <dd className={styles.value}>{email}</dd>
      </div>
      <div className={styles.field}>
        <dt className={styles.label}>Role</dt>
        <dd className={styles.value}>
          <span className={styles.rolePill}>{role}</span>
        </dd>
      </div>
    </dl>
  </main>
);

export default ProfileView;

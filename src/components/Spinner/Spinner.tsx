import React from 'react';

import styles from './Spinner.module.css';

export const Spinner: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
    </div>
  );
};

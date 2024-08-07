import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <Spinner animation="border" role="status" />
      <span className="sr-only"> Loading...</span>
    </div>
  );
};

export default Loader;

// @flow
import * as React from 'react';
import styles from './Card.module.css'

const Card = ({className, children}) => {
  const classes = className ? className : ''
  return (
    <div className={`${styles.card} ${classes}`}>
      {children}
    </div>
  );
};

export default Card
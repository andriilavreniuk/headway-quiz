import { createElement, FC, ReactNode } from 'react';

import styles from './Typography.module.css';

interface Props {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: ReactNode;
  color?: 'black' | 'gray' | 'orange';
  fontWeight?: 'normal' | 'bold';
  className?: string;
}

export const Typography: FC<Props> = ({
  tag = 'p',
  color = 'black',
  fontWeight = 'normal',
  className,
  children,
}) => {
  const elementClassName = `${styles.typography} ${
    styles[`typography--${tag}`]
  } ${styles[`typography--${fontWeight}`]} ${
    styles[`typography--color-${color}`]
  } ${className}`;

  return createElement(tag, { className: elementClassName }, children);
};

import Link from 'next/link';

import Hero from '@/assets/svg/Hero.svg';
import { Button, Typography } from '@/components';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles['home-background']}>
      <div className={styles['home-content']}>
        <Hero className={styles['home-content__image']} />
        <div className={styles['home-content__wrapper']}>
          <Typography
            tag="h1"
            fontWeight="bold"
            className={styles['home-content__text']}
          >
            Who wants to be a millionaire?
          </Typography>
          <Link href="/game" className={styles['home-content__button']}>
            <Button fullWidth>Start</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

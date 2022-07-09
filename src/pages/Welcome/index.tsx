import { useEffect } from 'react';
import { testApi } from '@/services/api';
import classNames from 'classnames';
import styles from './index.less';

export default function IndexPage() {
  async function doTest() {
    const res = await testApi({});
    console.log('res', res);
  }
  useEffect(() => {
    doTest();
  }, []);
  return (
    <div className={classNames('container')}>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}

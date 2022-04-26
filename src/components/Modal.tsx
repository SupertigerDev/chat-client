import styles from './Modal.module.scss';
export default function Modal(props: {show: boolean, component: () => JSX.Element}) {
  if (!props?.show) return <></>;
  return <div className={styles.background}>
    <div className={styles.container}>{props.component()}</div>
  </div>
}
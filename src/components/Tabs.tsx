import { Icon } from './Icon';
import styles from './Tabs.module.scss';
import mobx from 'mobx'

export default function Tabs() {
  return (
    <div className={styles.tabs}>
      <Tab icon="add" name="Add Server" />
      <Tab icon="settings" name="Server Settings" selected />
    </div>
  )
}

export function Tab(props: {icon: string, name: string, selected?: boolean}) {
  return (
    <div className={styles.tab} selected={props.selected}>
      <Icon name={props.icon} size={20} className={styles.icon} />
      <div className={styles.title}>{props.name}</div>
      <Icon name="close" size={20} className={styles.closeIcon} />
    </div>
  )
}
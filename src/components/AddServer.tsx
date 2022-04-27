import styles from './AddServer.module.scss';
import { Icon } from "./Icon";

export function AddServer() {
  return <div>
    <Icon name="dns" size={30} className={styles.icon} />
  </div>
}
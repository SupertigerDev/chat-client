import styles from './AddServer.module.scss';
import { Icon } from "../Icon";

import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';

export function AddServer() {
  return <div className={styles.addServerContainer}>
    <Icon name="dns" size={30} className={styles.icon} />
    <CustomInput label='Server Name' />
    <CustomButton label='Create Server' iconName='add_circle_outline'  />
  </div>
}
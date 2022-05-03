import styles from './CustomButton.module.scss';
import { Icon } from '../Icon';

export default function CustomButton(props: {className?: string, label?: string, iconName?: string, onClick?: () => void}) {
  return (
    <div className={styles.button + ` ${props.className || ""}`}>
      { props.iconName && <Icon name={props.iconName} /> }
      { props.label && <div className={styles.label}>{props.label}</div> }
    </div>
  )
}
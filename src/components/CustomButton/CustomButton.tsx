import styles from './CustomButton.module.scss';
import { Icon } from '../Icon/Icon';

export default function CustomButton(props: {className?: string, label?: string, iconName?: string, onClick?: () => void}) {
  return (
    <div className={styles.button + ` ${props.className || ""}`} onClick={props.onClick}>
      { props.iconName && <Icon name={props.iconName} /> }
      { props.label && <div className={styles.label}>{props.label}</div> }
    </div>
  )
}
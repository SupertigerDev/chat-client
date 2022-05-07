import styles from './CustomButton.module.scss';
import { Icon } from '../Icon/Icon';

export default function CustomButton(props: {color?: string, className?: string, label?: string, iconName?: string, onClick?: () => void}) {
  const color = props.color || 'var(--primary-color)';
  return (
    <div className={styles.button + ` ${props.className || ""}`}  onClick={props.onClick}>
      { props.iconName && <Icon name={props.iconName} className={styles.icon} color={color} /> }
      { props.label && <div className={styles.label} style={{color}}>{props.label}</div> }
    </div>
  )
}
import styles from './Icon.module.scss';

interface IconProps {
  name: string;
  color?: string;
  size?: number;
  className?: string
}

export function Icon(props: IconProps) {
  return <span className={"material-icons-round " + styles.icon +" " + props.className || "" } style={{color: props.color, fontSize: props.size + "px"}}>{props.name}</span>
}
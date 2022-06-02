import { MouseEventHandler } from 'react';
import styles from './Icon.module.scss';

interface IconProps {
  name: string;
  color?: string;
  size?: number;
  className?: string
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

export function Icon(props: IconProps) {
  return (
    <span
      className={"material-icons-round " + styles.icon +" " + props.className || "" }
      style={{color: props.color, fontSize: props.size + "px"}}
      onClick={props.onClick}>
        {props.name}
    </span>
  )
}
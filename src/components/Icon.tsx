interface IconProps {
  name: string;
  color?: string;
  size?: number;
  className?: string
}

export function Icon(props: IconProps) {
  return <span class={"material-icons-round " + props.className || "" } style={{color: props.color || 'white', fontSize: props.size + "px"}}>{props.name}</span>
}
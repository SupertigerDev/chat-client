export default function Icon(props: {name: string, size: number, color: string}) {
  return <object type="image/svg+xml" data={`/assets/icons/${props.name}.svg`}></object>

}
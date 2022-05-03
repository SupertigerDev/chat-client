import styles from './Avatar.module.scss';

interface Props {
  hexColor: string;
  url?: string;
  size: number;
}

export default function Avatar(props: Props) {
  return (
    <div className={styles.avatar} style={{backgroundColor: props.hexColor, height: props.size + "px", width: props.size + "px"}}>
      {!props.url && <img className={styles.avatarImage} src="/assets/avatar.png" alt="User Avatar" />}
    </div>
  )
}
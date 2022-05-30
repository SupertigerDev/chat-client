import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { client } from '../../common/client';
import Avatar from '../Avatar/Avatar';
import styles from './ServerSettingsHeader.module.scss';


const ServerSettingsHeader = observer(() => {
  const {serverId} = useParams();

  const server = client.servers.cache[serverId!];


  if (!server) return null;

  return (
    <div className={styles.header}>
      <Avatar hexColor={server.hexColor} size={80} />
      <div className={styles.details}>
        <div className={styles.title}>{server.name}</div>
        <div className={styles.members}>{server.serverMembers.array.length} members</div>
        <Link to="#" className={styles.link} >Rename</Link>
      </div>
    </div>
  )
});


export default ServerSettingsHeader;
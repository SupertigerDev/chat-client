import styles from './ServerDrawerHeader.module.scss';
import { Server } from "chat-api/build/store/Servers";
import { Icon } from "../Icon/Icon";
import { useParams } from 'react-router-dom';
import { client } from '../../common/client';
import { observer } from 'mobx-react-lite';

const ServerDrawerHeader = observer(() => {
  const {serverId} = useParams();
  const server = client.servers.cache[serverId!];
  return (
    <div className={styles.header}>
      <div>{server?.name}</div>
      <Icon size={18} name='expand_more' className={styles.showMoreIcon} />
    </div>
  )
});

export default ServerDrawerHeader;
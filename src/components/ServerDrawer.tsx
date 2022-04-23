import { Server } from 'chat-api/build/store/Servers';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { client } from '../common/client';
import { Icon } from './Icon';
import styles from './ServerDrawer.module.scss';

const ServerDrawer = observer(() => {
  const {serverId, channelId} = useParams();
  const server = client.servers.cache[serverId!];
  return (
    <div className={styles.serverDrawer}>
      <Header server={server} />
      {server?.channels?.map(channel => <div>{channel.server}</div>)}
      
    </div>
  )
});

function Header (props: {server?: Server}) {
  return (
    <div className={styles.header}>
      <div>{props.server?.name}</div>
      <Icon name='expand_more' className={styles.showMoreIcon} />
    </div>
  )
}


export default ServerDrawer;
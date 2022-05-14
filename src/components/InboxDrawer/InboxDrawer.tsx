import styles from './InboxDrawer.module.scss';
import { ServerChannel } from 'chat-api/build/store/Channels';
import { Server } from 'chat-api/build/store/Servers';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { client } from '../../common/client';
import { SERVER_MESSAGES } from '../../common/RouterEndpoints';
import { Icon } from '../Icon/Icon';

const ServerDrawer = observer(() => {
  return (
    <div className={styles.serverDrawer}>
      <Header/>
    </div>
  )
});

function Header () {
  return (
    <div className={styles.header}>
      <div className={styles.headerItem} selected> <Icon className={styles.headerIcon} name='inbox' size={18} />Inbox</div>
      <div className={styles.headerItem}> <Icon className={styles.headerIcon} name='group' size={18} />Friends</div>
    </div>
  )
}

function ChannelList(props: {server: Server}) {
  const {channelId} = useParams();
  return (
    <div className={styles.channelList}>
      {props?.server?.channels.map(channel => (
        <Channel channel={channel} key={channel._id} selected={channelId === channel._id} />
      ))}
    </div>
  )
}

function Channel(props: {channel: ServerChannel, selected: boolean}) {
  const { channel } = props;

  return (
    <Link to={SERVER_MESSAGES(channel._id, channel._id)} className={styles.channel} selected={props.selected}>
      <div className={styles.channelName}>{channel.name}</div>
    </Link>
  )
}


export default ServerDrawer;
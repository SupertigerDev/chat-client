import { ServerChannel } from 'chat-api/build/store/Channels';
import { Server } from 'chat-api/build/store/Servers';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { classNames, conditionalClass } from '../../common/classNames';
import { client } from '../../common/client';
import { SERVER_MESSAGES } from '../../common/RouterEndpoints';
import { Icon } from '../Icon/Icon';
import styles from './ServerDrawer.module.scss';

const ServerDrawer = observer(() => {
  const {serverId, channelId} = useParams();
  const server = client.servers.cache[serverId!];
  return (
    <div className={styles.serverDrawer}>
      <Header server={server} />
      <ChannelList server={server} />
    </div>
  )
});

function Header (props: {server?: Server}) {
  return (
    <div className={styles.header}>
      <div>{props.server?.name}</div>
      <Icon size={18} name='expand_more' className={styles.showMoreIcon} />
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
    <Link to={SERVER_MESSAGES(channel.server._id, channel._id)} className={classNames(styles.channel, conditionalClass(props.selected, styles.selected))}>
      <div className={styles.channelName}>{channel.name}</div>
    </Link>
  )
}


export default ServerDrawer;
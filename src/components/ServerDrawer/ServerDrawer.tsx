import { Channel } from 'chat-api/build/store/Channels';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { classNames, conditionalClass } from '../../common/classNames';
import { client } from '../../common/client';
import { SERVER_MESSAGES } from '../../common/RouterEndpoints';
import Header from '../ServerDrawerHeader/ServerDrawerHeader';
import styles from './ServerDrawer.module.scss';

const ServerDrawer = () => {
  return (
    <div className={styles.serverDrawer}>
      <Header />
      <ChannelList />
    </div>
  )
};



const ChannelList = observer(() => {
  const {serverId, channelId} = useParams();
  const server = client.servers.cache[serverId!];
  return (
    <div className={styles.channelList}>
      {server?.channels.map(channel => (
        <ChannelItem channel={channel} key={channel._id} selected={channelId === channel._id} />
      ))}
    </div>
  )
});

function ChannelItem(props: {channel: Channel, selected: boolean}) {
  const { channel } = props;
  if (!channel.server?._id) return null;
  return (
    <Link to={SERVER_MESSAGES(channel.server._id, channel._id)} className={classNames(styles.channel, conditionalClass(props.selected, styles.selected))}>
      <div className={styles.channelName}>{channel.name}</div>
    </Link>
  )
}


export default ServerDrawer;
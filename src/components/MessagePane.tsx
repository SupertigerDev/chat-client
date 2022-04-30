import { Message } from 'chat-api/build/common/Message';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import { client } from '../common/client';
import { store } from '../store/Store';
import Avatar from './Avatar';
import CustomButton from './CustomButton';
import styles from './MessagePane.module.scss';

export default function MessagePane() {
  const { serverId, channelId } = useParams();
  useEffect(() => {

    const disposeAutorun = autorun(() => {
      const channel = client.channels.cache[channelId!];
      if (!channel) return;
      
      store.tabStore.openTab({
        title: channel.name,
        serverId: serverId!,
        path: `/servers/${serverId}/${channelId}`,
      });
    })

    return () => disposeAutorun();

  }, [channelId])

  return (
    <div className={styles.messagePane}>
      <MessageLogArea />
      <MessageArea />
    </div>
  );
}

// convert timestamp to today at 13:00 or yesterday at 13:00 or date. add zero if single digit
function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today.getTime() - 86400000);
  if (date.getDate() === today.getDate()) {
    return `Today at ${date.getHours()}:${date.getMinutes()}`;
  } else if (date.getDate() === yesterday.getDate()) {
    return `Yesterday at ${date.getHours()}:${date.getMinutes()}`;
  } else {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
  }
}

const MessageItem = observer(({ message }: { message: Message }) => {
  return (
    <div className={styles.messageItem}>
      <Avatar hexColor={message.createdBy.hexColor} size={30} />
      <div className={styles.username}>{message.createdBy.username}</div>
      <div className={styles.date}>{formatTimestamp(message.createdAt)}</div>
      <div className={styles.content}>{message.content}</div>
    </div>
  );
});





const MessageLogArea = observer(() => {
  const {channelId} = useParams();

  useEffect(() => {
    const disposeAutorun = autorun(() => {
      const channel = client.channels.cache[channelId!];
      if (!channel) return;
      store.messageStore.loadChannelMessages(channel);
    })

    return () => disposeAutorun();
  }, [channelId])

  return <div className={styles.messageLogArea}>
    {store.messageStore.channelMessages[channelId!]?.map(message => (<MessageItem key={message._id} message={message} />))}
  </div>
})



function MessageArea() {
  return <div className={styles.messageArea}>
    <textarea placeholder='Message' className={styles.textArea}></textarea>
    <CustomButton iconName='send' className={styles.button}/>
  </div>
}
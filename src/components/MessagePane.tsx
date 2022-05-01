import { Message } from 'chat-api/build/common/Message';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'preact/hooks';
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

// make a function where if the number is less than 10, it will add a 0 in front of it
function pad(num: number) {
  return num < 10 ? `0${num}` : num;
}

// convert timestamp to today at 13:00 or yesterday at 13:00 or date. add zero if single digit
function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today.getTime() - 86400000);
  if (date.getDate() === today.getDate()) {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  } else if (date.getDate() === yesterday.getDate()) {
    return `Yesterday at ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  } else {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
}

const MessageItem = observer(({ message, beforeMessage }: { message: Message, beforeMessage: Message }) => {

  const Details = () => (
    <div className={styles.details}>
      <Avatar hexColor={message.createdBy.hexColor} size={30} />
      <div className={styles.username}>{message.createdBy.username}</div>
      <div className={styles.date}>{formatTimestamp(message.createdAt)}</div>
    </div>
  )
  const TimeStampCompact = () => (
    <div className={styles.compactDate}>{formatTimestamp(message.createdAt)}</div>
  )

  const isSameCreator = beforeMessage?.createdBy?._id === message?.createdBy?._id;
  const isDateUnderFiveMinutes = (message?.createdAt - beforeMessage?.createdAt) < 300000;


  const isCompact = isSameCreator && isDateUnderFiveMinutes;

  return (
    <div className={`${styles.messageItem} ${isCompact ? styles.compact : '' }`}>
      {isCompact ? null : <Details />}
      <div className={styles.messageContainer}>
        <div className={styles.content}>{message.content}</div>
        {isCompact ? <TimeStampCompact /> : null}
      </div>
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

  const messages = store.messageStore.channelMessages[channelId!];

  return <div className={styles.messageLogArea}>
    {messages?.map((message, i) => (<MessageItem key={message._id} message={message} beforeMessage={messages[i - 1]} />))}
  </div>
})



function MessageArea() {
  const { serverId, channelId } = useParams();

  const [message, setMessage] = useState('');

  const onKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedMessage = message.trim();
      setMessage('')
      if (!trimmedMessage) return;
      const channel = client.channels.cache[channelId!];
      store.messageStore.sendMessage(channel, trimmedMessage);
    }
  }
  
  const onChange = (event: any) => {
    setMessage(event.target?.value);
  }


  return <div className={styles.messageArea}>
    <textarea placeholder='Message' className={styles.textArea} onKeyDown={onKeyDown} onChange={onChange} value={message}></textarea>
    <CustomButton iconName='send' className={styles.button}/>
  </div>
}
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import { client } from '../../common/client';
import { store } from '../../store/Store';
import CustomButton from '../CustomButton/CustomButton';
import MessageItem from '../MessageItem/MessageItem';
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





const MessageLogArea = observer(() => {
  const {channelId} = useParams();
  const messageLogElement = useRef<HTMLDivElement>(null);
  const messages = store.messageStore.channelMessages[channelId!];
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<null | number>(null);

  useEffect(() => {
    setLastMessageTimestamp(null);
    const disposeAutorun = autorun(async () => {
      const channel = client.channels.cache[channelId!];
      if (!channel) return;
      await store.messageStore.loadChannelMessages(channel);
    })
    return () => disposeAutorun();
  }, [channelId])
  
  
  useLayoutEffect(() => {
    
    if (messageLogElement.current) {
      messageLogElement.current.scrollTop = 99999;
    }

    if (messages) {
      let timestamp = messages[messages.length - 1]?.createdAt - 10;
      if (!lastMessageTimestamp) {
        timestamp = Date.now();
      }
      setLastMessageTimestamp(timestamp);
    }
  }, [messages, messages?.length])
  

  return <div className={styles.messageLogArea} ref={messageLogElement} >
    {messages?.map((message, i) => (
      <MessageItem
        key={message.tempId || message._id}
        animate={lastMessageTimestamp && message.createdAt > lastMessageTimestamp}
        message={message}
        beforeMessage={messages[i - 1]}
      />)
    )}
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
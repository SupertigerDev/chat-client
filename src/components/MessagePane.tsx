import { autorun } from 'mobx';
import { useEffect } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import { client } from '../common/client';
import { store } from '../store/Store';
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

function MessageLogArea() {
  return <div className={styles.messageLogArea}>Message Log Area</div>
}

function MessageArea() {
  return <div className={styles.messageArea}>
    <textarea placeholder='Message' className={styles.textArea}></textarea>
    <CustomButton iconName='send' className={styles.button}/>
  </div>
}
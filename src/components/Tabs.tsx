import { Server } from 'chat-api/build/store/Servers';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'preact/hooks';
import { client } from '../common/client';
import { store } from '../store/Store';
import { Tab } from '../store/TabStore';
import Avatar from './Avatar';
import { Icon } from './Icon';
import styles from './Tabs.module.scss';

export const TabList = observer(() => {
  const tabs = store.tabStore.tabs;
  return (
    <div className={styles.tabs}>
      {tabs.map(tab => <TabItem tab={tab} />)}
      
    </div>
  )
})

export default TabList;

const TabItem = observer((props: {tab: Tab}) => {
  const [server, setServer] = useState<Server | null>(null);
  useEffect(() => {
      const server = client.servers.cache[props.tab.serverId!];
      if (!server) return;
      setServer(server);
  }, [props.tab])
  return (
    <div className={styles.tab} selected={true}>
      {/* <Icon name={props.icon} size={20} className={styles.icon} /> */}
      {server && <Avatar size={25} hexColor={server.hexColor} />}
      <div className={styles.details}>
        <div className={styles.title}>{props.tab.title}</div>
        {server && <div className={styles.subTitle}>{server.name}</div>}
      </div>
      <Icon name="close" size={20} className={styles.closeIcon} />
    </div>
  )
})
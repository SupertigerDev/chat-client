import { Server } from 'chat-api/build/store/Servers';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'preact/hooks';
import { Link, useLocation} from 'react-router-dom';
import { classNames } from '../../common/classNames';
import { client } from '../../common/client';
import { store } from '../../store/Store';
import { Tab } from '../../store/TabStore';
import Avatar from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import styles from './Tabs.module.scss';

export const TabList = observer(() => {
  const {tabs} = store.tabStore;
  return (
    <div className={styles.tabs}>
      {tabs.map(tab => <TabItem tab={tab} />)}
    </div>
  )
})

export default TabList;

const TabItem = observer((props: {tab: Tab}) => {
  const location = useLocation();
  const server = client.servers.cache[props.tab.serverId!];


  const onDoubleClick = () => {
    store.tabStore.updateTab(props.tab.path, {opened: true})
  }


  const selected = location.pathname === props.tab.path
  let subName = null;
  if (server) {
    subName = server.name;
  }
  if (props.tab.subName) {
    subName = props.tab.subName;
  }
  
  return (
    <Link to={props.tab.path} className={styles.tab + ` ${props.tab.opened && styles.opened}`} selected={selected} onDblClick={onDoubleClick}>
      {props.tab.iconName && <Icon name={props.tab.iconName} className={classNames(styles.icon, server ? styles.hasAvatar : '')} />}
      {server && <Avatar size={25} hexColor={server.hexColor} />}
      <div className={styles.details}>
        <div className={styles.title}>{props.tab.title}</div>
        {subName && <div className={styles.subTitle}>{subName}</div>}
      </div>
      <Icon name="close" size={14} className={styles.closeIcon} />
    </Link>
  )
})
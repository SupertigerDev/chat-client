import { observer } from 'mobx-react-lite';
import { Link, useLocation} from 'react-router-dom';
import { classNames, conditionalClass } from '../../common/classNames';
import { client } from '../../common/client';
import { store } from '../../store/Store';
import { Tab } from '../../store/TabStore';
import Avatar from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import UserPresence from '../UserPresence/UserPresence';
import styles from './Tabs.module.scss';

export const TabList = observer(() => {
  const {tabs} = store.tabStore;
  return (
    <div className={styles.tabs}>
      {tabs.map(tab => <TabItem key={tab.path} tab={tab} />)}
    </div>
  )
})

export default TabList;

const TabItem = observer((props: {tab: Tab}) => {
  const location = useLocation();
  const server = client.servers.cache[props.tab.serverId!];
  const user = client.users.cache[props.tab.userId!];


  const onDoubleClick = () => {
    store.tabStore.updateTab(props.tab.path, {opened: true})
  }


  const selected = location.pathname === props.tab.path
  let subName = null;
  let title = null;
  
  if (server) {
    subName = server.name;
  }
  if (user) {
    title = user.username;
  }

  if (props.tab.title) {
    title = props.tab.title;
  }

  if (props.tab.subName) {
    subName = props.tab.subName;
  }
  
  return (
    <Link to={props.tab.path} className={classNames(styles.tab, conditionalClass(props.tab.opened, styles.opened), conditionalClass(selected, styles.selected))} onDoubleClick={onDoubleClick}>
      {props.tab.iconName && <Icon name={props.tab.iconName} className={classNames(styles.icon, conditionalClass(server || user, styles.hasAvatar))} />}
      {server && <Avatar size={25} hexColor={server.hexColor} />}
      {user && <Avatar size={25} hexColor={user.hexColor} />}
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        {subName && <div className={styles.subTitle}>{subName}</div>}
        {user && <UserPresence user={user} showOffline={true} />}
      </div>
      <Icon name="close" size={20} className={styles.closeIcon} />
    </Link>
  )
})
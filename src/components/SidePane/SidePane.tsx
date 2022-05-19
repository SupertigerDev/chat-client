import { Server } from 'chat-api/build/store/Servers';
import { observer } from 'mobx-react-lite';
import { client } from '../../common/client';
import styles from './SidePane.module.scss';
import { Link, useLocation, useParams } from "react-router-dom";
import { Icon } from '../Icon/Icon';
import Avatar from '../Avatar/Avatar';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { AddServer } from '../AddServer/AddServer';
import { INBOX, SERVER_MESSAGES } from '../../common/RouterEndpoints';
import { classNames, conditionalClass } from '../../common/classNames';


export default function SidePane () {
  const [showAddServerModel, setShowAddServerModel] = useState(false);
  return <div className={styles.sidePane}>
    <InboxItem />
    <div className={styles.scrollable}>
      <Modal show={showAddServerModel} component={() => <AddServer />} />
      <ServerList />
      <Item iconName='add_box' onClick={() => setShowAddServerModel(true)}  />
    </div>
    <SettingsItem />
    <UserItem />
  </div>
}





function InboxItem() {
  const location = useLocation();
  const isSelected = location.pathname.startsWith(INBOX());

  return <Link to={INBOX()} className={classNames(styles.item, styles.settingsIcon, conditionalClass(isSelected, styles.selected))} >
    <Icon name='all_inbox' />
  </Link>
}
function SettingsItem() {
  return <div className={`${styles.item} ${styles.settingsIcon}`} >
    <Icon name='settings' />
  </div>
}

const UserItem = observer(() => {
  const user = client.account.user;

  if (!user) return <></>;
  return <div className={`${styles.item} ${styles.user}`} >
    <Avatar size={35} hexColor={user?.hexColor} />
  </div>
});


function ServerItem(props: {server: Server, selected?: boolean}) {
  const { _id, defaultChannel } = props.server;
  return <Link to={SERVER_MESSAGES(_id, defaultChannel)} className={classNames(styles.item, conditionalClass(props.selected, styles.selected))} >
    <Avatar size={35} hexColor={props.server.hexColor} />
  </Link>
}

function Item(props: {iconName: string, selected?: boolean, onClick?: () => void}) {
  return <div className={classNames(styles.item, conditionalClass(props.selected, styles.selected))} onClick={props.onClick} >
    <Icon name={props.iconName} size={40} />
  </div>
}


const  ServerList = observer(() => {
  const {serverId} = useParams();
  return <div className={styles.serverList}>
    {client.servers.array.map((server) => <ServerItem selected={ server._id === serverId } server={server} key={server._id} />)}
  </div>
});



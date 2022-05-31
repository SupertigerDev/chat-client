import { Server } from 'chat-api/build/store/Servers';
import { observer } from 'mobx-react-lite';
import { client } from '../../common/client';
import styles from './SidePane.module.scss';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Icon } from '../Icon/Icon';
import Avatar from '../Avatar/Avatar';
import Modal from '../Modal/Modal';
import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { AddServer } from '../AddServer/AddServer';
import { INBOX, SERVER_MESSAGES, SERVER_SETTINGS_INVITES } from '../../common/RouterEndpoints';
import { classNames, conditionalClass } from '../../common/classNames';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { store } from '../../store/Store';


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


function ServerItem(props: {server: Server, selected?: boolean, onContextMenu?: (e: MouseEvent) => void}) {
  const { _id, defaultChannel } = props.server;
  return <Link to={SERVER_MESSAGES(_id, defaultChannel)} onContextMenu={props.onContextMenu} className={classNames(styles.item, conditionalClass(props.selected, styles.selected))} >
    <Avatar size={35} hexColor={props.server.hexColor} />
  </Link>
}

function Item(props: {iconName: string, selected?: boolean, onClick?: () => void}) {
  return <div className={classNames(styles.item, conditionalClass(props.selected, styles.selected))} onClick={props.onClick} >
    <Icon name={props.iconName} size={40} />
  </div>
}


const  ServerList = observer(() => {
  const navigate = useNavigate();
  const {serverId} = useParams();

  const [contextPosition, setContextPosition] = useState<{x: number, y: number} | undefined>();


  const onContextMenu = (event: MouseEvent, serverId: string) => {
    event.preventDefault();
    setContextPosition({x: event.clientX, y: event.clientY});
  }


  return <div className={styles.serverList}>
    <ContextMenu items={[
      {icon: 'markunread_mailbox', label: "Mark As Read"},
      {separator: true},
      {icon: 'mail', label: "Invites", onClick: () => store.tabStore.selectTab(SERVER_SETTINGS_INVITES(serverId!), navigate)},
      {icon: 'settings', label: "Settings"},
      {separator: true},
      {icon: 'copy', label: "Copy ID"},
      {separator: true},
      {icon: 'logout', label: "Leave", alert: true},
    ]} position={contextPosition} onClose={() => setContextPosition(undefined)} />
    {client.servers.array.map((server) => <ServerItem selected={ server._id === serverId } server={server} key={server._id} onContextMenu={e => onContextMenu(e, server._id)} />)}
  </div>
});



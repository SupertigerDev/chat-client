import { Server } from 'chat-api/build/store/Servers';
import { observer } from 'mobx-react-lite';
import { client } from '../common/client';
import styles from './SidePane.module.scss';
import { Link, useParams } from "react-router-dom";
import { Icon } from './Icon';
import Avatar from './Avatar';
import Modal from './Modal';
import { useState } from 'preact/hooks';
import { AddServer } from './AddServer';


export default function SidePane () {
  const [showAddServerModel, setShowAddServerModel] = useState(false);
  return <div className={styles.sidePane}>
    <div className={styles.scrollable}>
      <Modal show={showAddServerModel} component={() => <AddServer />} />
      <ServerList />
      <Item iconName='add_box' onClick={() => setShowAddServerModel(true)}  />
    </div>
  </div>
}

const  ServerList = observer(() => {
  const {serverId} = useParams();
  return <div className={styles.serverList}>
    {client.servers.array.map((server) => <ServerItem selected={ server._id === serverId } server={server} key={server._id} />)}
  </div>
});


function ServerItem(props: {server: Server, selected?: boolean}) {
  const { _id, defaultChannel } = props.server;
  return <Link to={`/app/servers/${_id}/${defaultChannel}`} className={styles.item} selected={props.selected} >
    <Avatar size={35} hexColor={props.server.hexColor} />
  </Link>
}
function Item(props: {iconName: string, selected?: boolean, onClick?: () => void}) {
  return <div className={styles.item} selected={props.selected} onClick={props.onClick} >
    <Icon name={props.iconName} size={40} />
  </div>
}
import { Server } from 'chat-api/build/store/Servers';
import { observer } from 'mobx-react-lite';
import { client } from '../common/client';
import styles from './SidePane.module.scss';
import { Link, useParams } from "react-router-dom";
import { Icon } from './Icon';


export default function SidePane () {
  return <div className={styles.sidePane}>
    <div className={styles.scrollable}>
      <ServerList />
      <Item iconName='add_box' />
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
    <div className={styles.avatar} style={{backgroundColor: props.server.hexColor}}>
      <img className={styles.avatarImage} src="/assets/avatar.png" alt="" />
    </div>
  </Link>
}
function Item(props: {iconName: string, selected?: boolean}) {
  return <div className={styles.item} selected={props.selected} >
    <Icon name={props.iconName} size={40} />
  </div>
}
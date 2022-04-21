import { Server } from 'chat-api/build/store/Servers';
import { observer } from 'mobx-react-lite';
import { client } from '../common/client';
import styles from './SidePane.module.scss';

export default function SidePane () {
  return <div className={styles.sidePane}>
    <ServerList />
  </div>
}

const  ServerList = observer(() => {
  return <div className={styles.serverList}>
    {client.servers.array.map((server, i) => <ServerItem selected={ i === 0 } server={server} key={server._id} />)}
  </div>
});


function ServerItem(props: {server: Server, selected?: boolean}) {

  return <div className={styles.serverItem} selected={props.selected} >
    <div className={styles.avatar} style={{backgroundColor: props.server.hexColor}}>
      <img className={styles.avatarImage} src="/avatar.png" alt="" />
    </div>
  </div>
}
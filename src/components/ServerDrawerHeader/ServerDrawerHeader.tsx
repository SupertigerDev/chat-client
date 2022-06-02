import styles from './ServerDrawerHeader.module.scss';
import { Server } from "chat-api/build/store/Servers";
import { Icon } from "../Icon/Icon";
import { useParams } from 'react-router-dom';
import { client } from '../../common/client';
import { observer } from 'mobx-react-lite';
import { ContextMenuServer } from '../ContextMenuServer/ContextMenuServer';
import { useState } from 'react';

const ServerDrawerHeader = observer(() => {
  const {serverId} = useParams();
  const [contextPosition, setContextPosition] = useState<{x: number, y: number} | undefined>();
  const server = client.servers.cache[serverId!];

  const onClick =(e: any) => {
    setContextPosition({x: e.clientX, y: e.clientY});
  };

  return (
    <div className={styles.header}>
      <ContextMenuServer onClose={() => setContextPosition(undefined)} position={contextPosition} serverId={serverId} triggerClassName={styles.showMoreIcon} />
      <div>{server?.name}</div>
      <Icon size={18} name='expand_more' className={styles.showMoreIcon} onClick={onClick}  />
    </div>
  )
});

export default ServerDrawerHeader;
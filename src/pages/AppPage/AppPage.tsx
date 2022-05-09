import { useEffect } from 'preact/hooks';
import styles from './AppPage.module.scss';
import { client } from '../../common/client';
import SidePane from '../../components/SidePane/SidePane';
import Tabs from '../../components/Tabs/Tabs';
import ServerDrawer from '../../components/ServerDrawer/ServerDrawer';
import MessagePane from '../../components/MessagePane/MessagePane';
import ExploreServerPane from '../../components/ExploreServerPane/ExploreServerPane';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar/Avatar';
import ServerMembersDrawer from '../../components/ServerMembersDrawer/ServerMembersDrawer';

const DRAWER_WIDTH = 240;


export default function AppPage(props: {routeName?: string}) {
  
  useEffect(() => {
    client.login(localStorage['token']);
  }, [])
  

  return (
    <div className={styles.appPage}>
      <SidePane />
      <LeftPane width={DRAWER_WIDTH} routeName={props.routeName} />
      <MainPane routeName={props.routeName}/>
      {props.routeName === "server_messages" && <RightPane width={DRAWER_WIDTH}/>}
    </div>
  )
}

function MainPane (props: {routeName?: string}) {
  return <div className={styles.mainPane}>
    <Tabs />
    {props.routeName === 'server_messages' && <MessagePane />}
    {props.routeName === 'explore_server' && <ExploreServerPane />}
  </div>
}

function LeftPane (props: {width: number, routeName?: string}) {
  return <div style={{width: `${props.width}px`}} className={styles.leftPane}>
    {props.routeName === 'server_messages' && <ServerDrawer />}
  </div>
}

function RightPane (props: {width: number}) {
  return <div style={{width: `${props.width}px`}} className={styles.rightPane}>
    <ServerMembersDrawer />
  </div>
}
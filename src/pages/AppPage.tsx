import { useEffect } from 'preact/hooks';
import styles from './AppPage.module.scss';
import { client } from '../common/client';
import SidePane from '../components/SidePane';
import Tabs from '../components/Tabs';
import ServerDrawer from '../components/ServerDrawer';
import MessagePane from '../components/MessagePane';

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
      <RightPane width={DRAWER_WIDTH}/>
    </div>
  )
}

function MainPane (props: {routeName?: string}) {
  return <div className={styles.mainPane}>
    <Tabs />
    {props.routeName === 'server_messages' && <MessagePane />}
  </div>
}

function LeftPane (props: {width: number, routeName?: string}) {
  return <div style={{width: `${props.width}px`}} className={styles.leftPane}>
    {props.routeName === 'server_messages' && <ServerDrawer />}

  </div>
}

function RightPane (props: {width: number}) {
  return <div style={{width: `${props.width}px`}} className={styles.rightPane}>RightPane</div>
}
import { useEffect } from 'preact/hooks';
import styles from './AppPage.module.scss';
import {Client} from 'chat-api';
const DRAWER_WIDTH = 240;


export default function AppPage() {

  useEffect(() => {
    const client = new Client();
    client.login(localStorage['token']);
  }, [])

  return (
    <div className={styles.appPage}>
      <SidePane />
      <LeftPane width={DRAWER_WIDTH}/>
      <MainPane/>
      <RightPane width={DRAWER_WIDTH}/>
    </div>
  )
}


function SidePane () {
  return <div className={styles.sidePane}>
    Side Pane
  </div>
}
function MainPane () {
  return <div className={styles.mainPane}>
    MainPage
  </div>
}

function LeftPane (props: {width: number}) {
  return <div style={{width: `${props.width}px`}} className={styles.leftPane}>LeftPane</div>
}

function RightPane (props: {width: number}) {
  return <div style={{width: `${props.width}px`}} className={styles.rightPane}>RightPane</div>
}
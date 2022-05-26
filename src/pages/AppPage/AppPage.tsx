import { lazy, useEffect } from 'react';
import styles from './AppPage.module.scss';
import { client } from '../../common/client';
import SidePane from '../../components/SidePane/SidePane';
import Tabs from '../../components/Tabs/Tabs';

const ServerDrawer = lazy(() => import('../../components/ServerDrawer/ServerDrawer'));
const InboxDrawer = lazy(() => import('../../components/InboxDrawer/InboxDrawer'));
const ServerMembersDrawer = lazy(() => import('../../components/ServerMembersDrawer/ServerMembersDrawer'));

const MessagePane = lazy(() => import('../../components/MessagePane/MessagePane'));
const ExploreServerPane = lazy(() => import('../../components/ExploreServerPane/ExploreServerPane'));

import { getStorageString, StorageKeys } from '../../common/localStorage';
import { CustomSuspense } from '../../components/CustomSuspense/CustomSuspense';

const DRAWER_WIDTH = 240;


export default function AppPage(props: {routeName?: string}) {
  
  useEffect(() => {
    client.login(getStorageString(StorageKeys.USER_TOKEN, ''));
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
    {props.routeName === 'server_messages' && <CustomSuspense><MessagePane /></CustomSuspense>}
    {props.routeName === 'inbox_messages' && <CustomSuspense><MessagePane /></CustomSuspense>}
    {props.routeName === 'explore_server' && <CustomSuspense><ExploreServerPane /></CustomSuspense>}
  </div>
}

function LeftPane (props: {width: number, routeName?: string}) {
  return <div style={{width: `${props.width}px`}} className={styles.leftPane}>
    {props.routeName === 'server_messages' && <CustomSuspense><ServerDrawer /></CustomSuspense>}
    {props.routeName === 'inbox_messages' && <CustomSuspense><InboxDrawer /></CustomSuspense>}
    {props.routeName === 'inbox' && <CustomSuspense><InboxDrawer /></CustomSuspense>}
  </div>
}

function RightPane (props: {width: number}) {
  return <div style={{width: `${props.width}px`}} className={styles.rightPane}>
    <CustomSuspense><ServerMembersDrawer /></CustomSuspense>
  </div>
}
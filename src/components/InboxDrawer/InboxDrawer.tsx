import styles from './InboxDrawer.module.scss';
import { observer } from 'mobx-react-lite';
import { Icon } from '../Icon/Icon';
import { useState } from 'react';
import { getStorageNumber, setStorageNumber, StorageKeys } from '../../common/localStorage';
import InboxDrawerFriends from '../InboxDrawerFriends/InboxDrawerFriends';
import { classNames, conditionalClass } from '../../common/classNames';
import { client } from '../../common/client';
import FriendItem from '../InboxDrawerFriendItem/InboxDrawerFriendItem';
import { FriendStatus } from 'chat-api/build/store/Friends';

function Header (props: {selectedIndex: number, onTabClick: (index: number) => void}) {
  const { selectedIndex, onTabClick } = props;


  const friendRequests = client.friends.array.filter(friend => friend.status === FriendStatus.PENDING);

  return (
    <div className={styles.header}>
      <HeaderItem
        name='Inbox'
        iconName='inbox'
        selected={selectedIndex === 0}
        onClick={() => onTabClick(0)}

      />
      <HeaderItem
        name='Friends'
        iconName='group'
        selected={selectedIndex === 1}
        notificationCount={friendRequests.length}
        onClick={() => onTabClick(1)}
    />
    </div>
  )
}

function HeaderItem (props: {name: string, iconName: string, selected: boolean, onClick: () => void, notificationCount?: number}) {
  return (
    <div className={classNames(styles.headerItem,  conditionalClass(props.selected, styles.selected))} onClick={props.onClick}>
      <Icon className={styles.headerIcon} name={props.iconName} size={18} />
      {props.name}
      {!!props.notificationCount && <div className={styles.notificationCount}>{props.notificationCount}</div>}
    </div>
  )
}



const InboxDrawer = observer(() => {
  const [selectedIndex, setSelectedIndex] = useState(getStorageNumber(StorageKeys.INBOX_DRAWER_SELECTED_INDEX, 0));
  
  const onTabClick = (index: number) => {
    setStorageNumber(StorageKeys.INBOX_DRAWER_SELECTED_INDEX, index);
    setSelectedIndex(index);
  }


  return (
    <div className={styles.inboxDrawer}>
      <Header selectedIndex={selectedIndex} onTabClick={onTabClick} />
      {selectedIndex === 0 && <InboxDrawerTab/>}
      {selectedIndex === 1 && <InboxDrawerFriends /> }
    </div>
  )
});


const InboxDrawerTab = observer(() => {
  const inbox = client.inbox;
  return <div>
    {inbox.array.map(inbox => inbox.channel && <FriendItem key={inbox.channel._id} user={inbox.channel.recipient!}  />)}
  </div>
});





export default InboxDrawer;
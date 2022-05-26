import styles from './InboxDrawer.module.scss';
import { observer } from 'mobx-react-lite';
import { Icon } from '../Icon/Icon';
import { useState } from 'react';
import { getStorageNumber, setStorageNumber, StorageKeys } from '../../common/localStorage';
import InboxDrawerFriends from '../InboxDrawerFriends/InboxDrawerFriends';
import { classNames, conditionalClass } from '../../common/classNames';
import { client } from '../../common/client';
import FriendItem from '../InboxDrawerFriendItem/InboxDrawerFriendItem';

function Header (props: {selectedIndex: number, onTabClick: (index: number) => void}) {
  const { selectedIndex, onTabClick } = props;
  return (
    <div className={styles.header}>
      <div className={classNames(styles.headerItem,  conditionalClass(selectedIndex === 0, styles.selected))} onClick={() => onTabClick(0)}> <Icon className={styles.headerIcon} name='inbox' size={18} />Inbox</div>
      <div className={classNames(styles.headerItem,  conditionalClass(selectedIndex === 1, styles.selected))} onClick={() => onTabClick(1)}> <Icon className={styles.headerIcon} name='group' size={18} />Friends</div>
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
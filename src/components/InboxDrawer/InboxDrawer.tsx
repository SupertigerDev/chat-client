import styles from './InboxDrawer.module.scss';
import { observer } from 'mobx-react-lite';
import { Icon } from '../Icon/Icon';
import { useState } from 'preact/hooks';
import { getStorageNumber, setStorageNumber, StorageKeys } from '../../common/localStorage';
import InboxDrawerFriends from '../InboxDrawerFriends/InboxDrawerFriends';

function Header (props: {selectedIndex: number, onTabClick: (index: number) => void}) {
  const { selectedIndex, onTabClick } = props;
  return (
    <div className={styles.header}>
      <div className={styles.headerItem} selected={selectedIndex === 0} onClick={() => onTabClick(0)}> <Icon className={styles.headerIcon} name='inbox' size={18} />Inbox</div>
      <div className={styles.headerItem} selected={selectedIndex === 1} onClick={() => onTabClick(1)}> <Icon className={styles.headerIcon} name='group' size={18} />Friends</div>
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
      {selectedIndex === 1 && <InboxDrawerFriends /> }
    </div>
  )
});






export default InboxDrawer;
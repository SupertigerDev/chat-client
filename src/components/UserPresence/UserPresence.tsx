import { User } from 'chat-api/build/store/Users';
import { observer } from 'mobx-react-lite';
import { classNames } from '../../common/classNames';
import { userStatusDetail } from '../../common/userStatus';
import styles from './UserPresence.module.scss';


const UserPresence = observer((props: {user: User, showOffline: boolean}) => {
  const {user} = props;


  if (!props.showOffline && !user.presence.status) {
    return <></>
  }

  const statusDetails = userStatusDetail(user.presence.status || 0)
  if (!statusDetails) {
    return <></>
  }
  

  return (
    <div className={styles.userPresence}>
      <div className={classNames(styles.dot, styles[statusDetails?.id])} />
      <div className={styles.value}>{statusDetails?.name}</div>
    </div>
  )

});

export default UserPresence;
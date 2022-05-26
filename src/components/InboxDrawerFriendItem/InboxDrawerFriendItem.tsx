import styles from "./InboxDrawerFriendItem.module.scss";
import { Friend, FriendStatus } from "chat-api/build/store/Friends";
import { classNames, conditionalClass } from "../../common/classNames";
import Avatar from "../Avatar/Avatar";
import CustomButton from "../CustomButton/CustomButton";
import { User } from "chat-api/build/store/Users";
import { useNavigate, useParams } from "react-router-dom";
import { INBOX_MESSAGES } from "../../common/RouterEndpoints";

export default function FriendItem(props: { friend?: Friend, user?: User}) {
  const navigate = useNavigate();
  const {channelId: selectedChannelId} = useParams();


  let user: User;
  const { friend } = props;

  if (friend) {
    user = props.friend?.user!;
  } else {
    user = props.user!;
  }

  const isFriendRequest = friend?.status === FriendStatus.PENDING || friend?.status === FriendStatus.SENT;
  const isSelected = user.inboxChannelId &&  selectedChannelId === user.inboxChannelId;

  const showAccept = friend?.status === FriendStatus.PENDING;
  const showDecline = friend?.status === FriendStatus.PENDING || friend?.status === FriendStatus.SENT;

  const onAcceptClick = () => friend?.acceptFriendRequest()
  const onDeclineClick = () => friend?.removeFriend()


  const onFriendClick = async () => {
    if (!user.inboxChannelId) {
      await user.openDM();
      if (!user.inboxChannelId) return;
    }

    navigate(INBOX_MESSAGES(user.inboxChannelId));
  }
  


  return (
    <div className={classNames(styles.friendItem, conditionalClass(isFriendRequest, styles.requestItem), conditionalClass(isSelected, styles.selected))} onClick={onFriendClick}>
      <Avatar hexColor={user.hexColor} size={25} />
      <div className={styles.username}>{user.username}</div>
      <div className={styles.requestButtons}>
        {showAccept && <CustomButton className={styles.button} iconName="check" onClick={onAcceptClick} />}
        {showDecline && <CustomButton className={styles.button} iconName="cancel" color="var(--alert-color)" onClick={onDeclineClick} />}
      </div>
      
    </div>
  )
}

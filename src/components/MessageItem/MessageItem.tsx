import { observer } from 'mobx-react-lite';
import { classNames, conditionalClass } from '../../common/classNames';
import { LocalMessage, MessageSentStatus } from '../../store/MessageStore';
import Avatar from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import styles from './MessageItem.module.scss';

// make a function where if the number is less than 10, it will add a 0 in front of it
function pad(num: number) {
  return num < 10 ? `0${num}` : num;
}

// convert timestamp to today at 13:00 or yesterday at 13:00 or date. add zero if single digit
function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today.getTime() - 86400000);
  if (date.getDate() === today.getDate()) {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  } else if (date.getDate() === yesterday.getDate()) {
    return `Yesterday at ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  } else {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
}


function FloatOptions(props: { message: LocalMessage, isCompact: boolean }) {

  const onDeleteClick = () => {
    props.message.delete();
  }
  
  return (
    <div className={styles.floatOptions}>
      {props.isCompact && (<div className={styles.floatDate}>{formatTimestamp(props.message.createdAt)}</div>)}
      <div className={styles.item}><Icon name='edit' className={styles.icon} /></div>
      <div className={styles.item} onClick={onDeleteClick}><Icon name='delete' className={styles.icon} color='var(--alert-color)' /></div>
    </div>
  )
}



const MessageItem = observer((props: { message: LocalMessage, beforeMessage: LocalMessage, animate?: boolean }) => {

  const Details = () => (
    <div className={styles.details}>
      <Avatar hexColor={props.message.createdBy.hexColor} size={30} />
      <div className={styles.username}>{props.message.createdBy.username}</div>
      <div className={styles.date}>{formatTimestamp(props.message.createdAt)}</div>
    </div>
  )

  const isSameCreator = props.beforeMessage?.createdBy?._id === props.message?.createdBy?._id;
  const isDateUnderFiveMinutes = (props.message?.createdAt - props.beforeMessage?.createdAt) < 300000;


  const isCompact = isSameCreator && isDateUnderFiveMinutes;

  return (
    <div className={classNames(styles.messageItem, conditionalClass(isCompact, styles.compact), conditionalClass(props.animate, styles.animate))}>
      <FloatOptions isCompact={isCompact} message={props.message} />
      <div className={styles.messageItemOuterContainer}>
        <div className={styles.messageItemContainer}>
          {isCompact ? null : <Details />}
          <div className={styles.messageContainer}>
            {props.message.sentStatus === MessageSentStatus.FAILED && <Icon name='error_outline' size={14} color="var(--alert-color)" className={styles.messageStatus} />}
            {props.message.sentStatus === MessageSentStatus.SENDING && <Icon name='query_builder' size={14} color="rgba(255,255,255,0.4)" className={styles.messageStatus} />}
            <div className={styles.content}>{props.message.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MessageItem;


import CustomButton from './CustomButton';
import styles from './MessagePane.module.scss';

export default function MessagePane() {
  return (
    <div className={styles.messagePane}>
      <MessageLogArea />
      <MessageArea />
    </div>
  );
}

function MessageLogArea() {
  return <div className={styles.messageLogArea}>Message Log Area</div>
}

function MessageArea() {
  return <div className={styles.messageArea}>
    <textarea placeholder='Message' className={styles.textArea}></textarea>
    <CustomButton iconName='send' className={styles.button}/>
  </div>
}
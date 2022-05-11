import styles from './ServerMembersDrawer.module.scss';
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { client } from "../../common/client";
import Avatar from "../Avatar/Avatar";
import { ServerMember } from 'chat-api/build/store/ServerMembers';
import { userStatusDetail } from '../../common/userStatus';
import UserPresence from '../UserPresence/UserPresence';


const MemberItem = observer((props: {member: ServerMember}) => {
  const {member} = props;
  const {user} = member;

  return (
    <div className={styles.memberItem}>
      <Avatar size={25} hexColor={user.hexColor} />
      <div className={styles.memberInfo}>
        <div className={styles.username}>{user.username}</div>
        <UserPresence user={user} />
      </div>
    </div>
  )
});



const ServerMembersDrawer = observer(() => {
  const {serverId} = useParams();
  const server = client.servers.cache[serverId!];
  const members = server?.serverMembers.array || [];

  return <div className={styles.membersList}>
    {members.map(member => <MemberItem key={member.user._id} member={member} />)}
  </div>
})

export default ServerMembersDrawer;
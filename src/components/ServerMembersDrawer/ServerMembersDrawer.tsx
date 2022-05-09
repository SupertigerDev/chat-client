import styles from './ServerMembersDrawer.module.scss';
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { client } from "../../common/client";
import Avatar from "../Avatar/Avatar";
import { ServerMember } from 'chat-api/build/store/ServerMembers';


function MemberItem (props: {member: ServerMember}) {
  const {member} = props;
  return (
    <div className={styles.memberItem}>
      <Avatar size={25} hexColor={member.user.hexColor} />
      <span className={styles.username}>{member.user.username}</span>
      <span>{ member.user.presence.status }</span>
    </div>
  )
}



const ServerMembersDrawer = observer(() => {
  const {serverId} = useParams();
  const server = client.servers.cache[serverId!];
  const members = server?.serverMembers.array || [];

  return <div className={styles.membersList}>
    {members.map(member => <MemberItem key={member.user._id} member={member} />)}
  </div>
})

export default ServerMembersDrawer;
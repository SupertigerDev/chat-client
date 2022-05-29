import styles from './ServerSettingsInvite.module.scss'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EXPLORE_SERVER_INVITE } from '../../common/RouterEndpoints';
import { getInvites } from '../../services/ServerService';
import { store } from '../../store/Store';
import Avatar from '../Avatar/Avatar';

export default function ServerSettingsInvite() {
  const [invites, setInvites] = useState<any[]>([]);
  const navigate = useNavigate();
  const {serverId} = useParams();
  
  
  useEffect(() => {
    getInvites(serverId!).then(setInvites);

    store.tabStore.openTab({
      title: "Invites",
      serverId: serverId!,
      iconName: 'settings',
      path: location.pathname,
    }, navigate, false);
  }, [serverId])

  return (
    <div>
      {invites.map(invite => <InviteItem key={invite.code} invite={invite} />)}
    </div>
  )
}


function InviteItem(props: {invite: any}) {
  const url = import.meta.env.VITE_APP_URL + EXPLORE_SERVER_INVITE(props.invite.code);
  return (
    <div className={styles.inviteItem}>
      <Avatar hexColor={props.invite.createdBy.hexColor} size={30} />
      <div className={styles.details}>
        <Link to={EXPLORE_SERVER_INVITE(props.invite.code)} className={styles.url}>{url}</Link>
        <div className={styles.username}><span className={styles.usernameText}>Created By </span>{props.invite.createdBy.username}</div>
        <div className={styles.uses}>{props.invite.uses}<span className={styles.usesText}> uses</span></div>
      </div>
    </div>
  )
}
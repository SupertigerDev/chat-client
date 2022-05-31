import styles from './ServerSettingsInvite.module.scss'
import { memo, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EXPLORE_SERVER_INVITE_SHORT } from '../../common/RouterEndpoints';
import { createInvite, getInvites } from '../../services/ServerService';
import { store } from '../../store/Store';
import Avatar from '../Avatar/Avatar';
import CustomButton from '../CustomButton/CustomButton';
import env from '../../common/env';
import { autorun } from 'mobx';
import { classNames, conditionalClass } from '../../common/classNames';
import { formatTimestamp } from '../../common/date';
import { Icon } from '../Icon/Icon';

export default function ServerSettingsInvite() {
  const [invites, setInvites] = useState<any[]>([]);
  const [mobileSize, isMobileSize] = useState(false);
  const navigate = useNavigate();
  const {serverId} = useParams();


  useEffect(() => {
    const destroy = autorun(() => {
      const isMobile = store.windowPropertyStore?.mainPaneWidth! < env.MOBILE_WIDTH;
      isMobileSize(isMobile);
    })
    return destroy;
  }, [])
  
  
  useEffect(() => {
    getInvites(serverId!).then((invites) => setInvites(invites.reverse()));

    console.log("sd");

    store.tabStore.openTab({
      title: "Settings - Invites",
      serverId: serverId!,
      iconName: 'settings',
      path: location.pathname,
    }, navigate, false);
  }, [serverId])



  const onCreateInviteClick = async () => {
    await createInvite(serverId!);
    getInvites(serverId!).then((invites) => setInvites(invites.reverse()));
  }



  return (
    <div className={classNames(styles.invitesPane, conditionalClass(mobileSize, styles.mobile))}>
      <div className={styles.title}>Server Invites</div>
      <CustomButton label='Create Invite' iconName='add' className={styles.createInviteButton} onClick={onCreateInviteClick} />
      {invites.map(invite => <InviteItem key={invite.code} invite={invite} />)}
    </div>
  )
}


const InviteItem = memo((props: {invite: any}) => {
  const url = env.APP_URL + EXPLORE_SERVER_INVITE_SHORT(props.invite.code);

  return (
    <div className={styles.inviteItem}>
      <Avatar hexColor={props.invite.createdBy.hexColor} size={30} />
      <div className={styles.detailsOuter}>
        <div className={styles.details}>
          <Link to={EXPLORE_SERVER_INVITE_SHORT(props.invite.code)} className={styles.url}>{url}</Link>
          <div className={styles.otherDetails}>
            <Icon name='person' size={14} className={styles.icon} />
            {props.invite.createdBy.username}
            <Icon name='whatshot' size={14} className={styles.icon} />
            {props.invite.uses} uses
            <Icon name='today' size={14} className={styles.icon} />
            {formatTimestamp(props.invite.createdAt)}</div>
        </div>
        <CustomButton className={classNames(styles.copyButton, styles.button)} label='Copy Link' iconName='copy' />
        <CustomButton className={classNames(styles.deleteButton, styles.button)} label='Delete' iconName='delete' color='var(--alert-color)' />
      </div>
    </div>
  )
});
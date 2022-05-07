import styles from './ExploreServerPane.module.scss';
import { useEffect, useState } from "preact/hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { joinServerByInviteCode, serverDetailsByInviteCode, ServerWithMemberCount } from "../../services/ServerService";
import Avatar from "../Avatar/Avatar";
import CustomButton from '../CustomButton/CustomButton';
import Input from '../CustomInput/CustomInput';
import { Icon } from '../Icon/Icon';
import { store } from '../../store/Store';
import { observer } from 'mobx-react-lite';
import { client } from '../../common/client';
import { EXPLORE_SERVER_INVITE, SERVER_MESSAGES } from '../../common/RouterEndpoints';

export default function ExploreServerPane() {
  const { inviteId } = useParams();
  const navigate = useNavigate();
  const [server, setServer] = useState<ServerWithMemberCount | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchInvite = async (code: string) => {
    const fetchedServer = await serverDetailsByInviteCode(code).catch(err => {
      setError(err.message);
    });
    setServer(fetchedServer || null);
  }

  const errorJoinClick = (newCode: string) => {
    if (!newCode) return;
    let newPath = EXPLORE_SERVER_INVITE(newCode);
    store.tabStore.updateTab(EXPLORE_SERVER_INVITE(inviteId!), {
      path: EXPLORE_SERVER_INVITE(newCode)
    })
    store.tabStore.selectTab(newPath, navigate);
  }
  
  useEffect(() => {
    setError("");
    store.tabStore.openTab({
      path: EXPLORE_SERVER_INVITE(inviteId!),
      title: "Explore",
      subName: "Join Server",
      iconName: 'explore',
    }, navigate)

    fetchInvite(inviteId!);
  }, [inviteId])

  if (error) {
    return <InvalidServerPage inviteId={inviteId} message={error}  onJoinClick={errorJoinClick}/>
  }

  if (!server) {
    return <div>Loading...</div>;
  }

  return (
    <ServerPage server={server} inviteCode={inviteId}  />
  )

}


const ServerPage = observer((props: {server: ServerWithMemberCount, inviteCode: string}) => {
  const navigate = useNavigate();
  let [joinClicked, setJoinClicked] = useState(false);
  const {server} = props;

  const cacheServer = client.servers.cache[server._id];

  useEffect(() => {
    if (joinClicked && cacheServer) {
      navigate(SERVER_MESSAGES(cacheServer._id, cacheServer.defaultChannel));
    }
  }, [cacheServer])
  
  const joinServerClick = () => {
    if (joinClicked) return;
    setJoinClicked(true);
    joinServerByInviteCode(props.inviteCode).catch((err) => {
      alert(err.message)
    })
  }

  return (
    <div>
      <div className={styles.topArea}>
        <div className={styles.banner}></div>
        <div className={styles.bannerFloatingItems}>
          {server && <Avatar hexColor={server.hexColor} size={90} />}
          <div className={styles.details}>
            <div className={styles.name}>{server.name}</div>
            <div className={styles.memberCount}>{server.memberCount} members</div>
          </div>
          {!cacheServer && <CustomButton className={styles.joinButton} iconName='login' label='Join Server' onClick={joinServerClick} color="var(--success-color)" />}
          {cacheServer && (
            <Link to={SERVER_MESSAGES(server._id, server.defaultChannel)} className={styles.joinButton}>
              <CustomButton iconName='login' label='Visit Server' />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
});



function InvalidServerPage (props: {message: string, inviteId?: string, onJoinClick?: (newCode: string) => void}) {
  const [inviteCode, setInviteCode] = useState<string>(props.inviteId || "");

  return (
    <div class={styles.invalidServerPage}>
      <Icon name='error' color='var(--alert-color)' size={80} />
      <div className={styles.errorMessage}>{props.message}</div>
      <div className={styles.message}>Please try again later.</div>
      <Input label='Invite Code'  value={inviteCode} onText={setInviteCode}  />
      <CustomButton label='Try Again' iconName='refresh' onClick={() => props.onJoinClick?.(inviteCode)} />
    </div>
  );
}
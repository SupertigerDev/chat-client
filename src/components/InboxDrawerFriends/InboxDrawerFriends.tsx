import { Friend, FriendStatus } from "chat-api/build/store/Friends";
import { UserStatus } from "chat-api/build/store/Users";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useTransition } from "react";

import { client } from "../../common/client";
import Avatar from "../Avatar/Avatar";
import styles from "./InboxDrawerFriends.module.scss";

const InboxDrawerFriends = observer(() => {
  const [separatedFriends, setSeparatedFriends] = useState<ReturnType<typeof separateFriends>>();
  const [pending, startTransition] = useTransition();
  
  useEffect(() => {
    const dispose = autorun(() => {
      startTransition(() => {
        const friends = client.friends.array;
        setSeparatedFriends(separateFriends(friends));
      })
    })
    return dispose;
  }, []);

  if (!separatedFriends) return null;

  return (
    <div className={styles.inboxDrawerFriends}>
      <div className={styles.title}>Requests ({separatedFriends.requests.length})</div>
      {separatedFriends.requests.map(friend => ( <FriendItem key={friend.userId} friend={friend} /> ))}

      <div className={styles.title}>Online ({separatedFriends.onlineFriends.length})</div>
      {separatedFriends.onlineFriends.map(friend => ( <FriendItem key={friend.userId} friend={friend} /> ))}
      
      <div className={styles.title}>Offline ({separatedFriends.offlineFriends.length})</div>
      {separatedFriends.offlineFriends.map(friend => ( <FriendItem key={friend.userId} friend={friend} /> ))}
    </div>
  )
});
export default InboxDrawerFriends;

export function FriendItem(props: { friend: Friend }) {
  const { friend } = props;
  const { user } = friend;
  return (
    <div className={styles.friendItem}>
      <Avatar hexColor={user.hexColor} size={25} />
      <div className={styles.username}>{user.username}</div>
    </div>
  )
}

function separateFriends(friends: Friend[]) {
  const requests = [];
  const onlineFriends = [];
  const offlineFriends = [];

  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    if (friend.status === FriendStatus.PENDING || friend.status === FriendStatus.SENT) {
      requests.push(friend);
      continue;
    }
    if (friend.user.presence.status !== UserStatus.OFFLINE) {
      onlineFriends.push(friend);
      continue;
    }
    offlineFriends.push(friend);
  }
  return { requests, onlineFriends, offlineFriends };
}
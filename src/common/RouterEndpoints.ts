export const SERVER_MESSAGES = (serverId: string, channelId: string) => `/app/servers/${serverId}/${channelId}`

export const EXPLORE_SERVER_INVITE = (inviteId: string) => `/app/explore/servers/invites/${inviteId}`;

export const INBOX = () => '/app/inbox';
export const INBOX_MESSAGES = (channelId: string) => `/app/inbox/${channelId}`;

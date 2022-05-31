export const SERVER_MESSAGES = (serverId: string, channelId: string) => `/app/servers/${serverId}/${channelId}`

export const SERVER_SETTINGS_INVITES = (serverId: string) => `/app/servers/${serverId}/settings/invites`;

export const EXPLORE_SERVER_INVITE = (inviteId: string) => `/app/explore/servers/invites/${inviteId}`;
export const EXPLORE_SERVER_INVITE_SHORT = (inviteId: string) => `/i/${inviteId}`;

export const INBOX = () => '/app/inbox';
export const INBOX_MESSAGES = (channelId: string) => `/app/inbox/${channelId}`;

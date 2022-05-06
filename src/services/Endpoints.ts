export default {
  loginEndpoint: () => "/users/login",
  serverInvitesEndpoint: (serverId: string) => `/servers/${serverId}/invite`,
  serverInviteCodeEndpoint: (inviteCode: string) => `/servers/invites/${inviteCode}`,
}
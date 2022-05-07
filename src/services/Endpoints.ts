export default {
  loginEndpoint: () => "/users/login",
  registerEndpoint: () => "/users/register",
  serverInvitesEndpoint: (serverId: string) => `/servers/${serverId}/invite`,
  serverInviteCodeEndpoint: (inviteCode: string) => `/servers/invites/${inviteCode}`,
}
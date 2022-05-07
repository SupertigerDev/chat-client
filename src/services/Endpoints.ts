export default {
  loginEndpoint: () => "/users/login",
  registerEndpoint: () => "/users/register",


  serversEndpoint: () => `/servers`,
  serverInvitesEndpoint: (serverId: string) => `/servers/${serverId}/invite`,
  serverInviteCodeEndpoint: (inviteCode: string) => `/servers/invites/${inviteCode}`,
}
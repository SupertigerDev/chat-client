export default {
  loginEndpoint: () => "/users/login",
  serverInvitesEndpoint: (serverId: string) => `/servers/${serverId}invite`,
}
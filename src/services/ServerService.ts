import { request } from "./request";
import Endpoints from "./Endpoints";
import {RawServer} from 'chat-api/build/types/RawData'




export async function getInvites(serverId: string): Promise<any> {
  return request({
    method: "GET",
    url: import.meta.env.VITE_SERVER_URL + "/api" + Endpoints.serverInvitesEndpoint(serverId),
    useToken: true
  });
}


export async function createServer(serverName: string): Promise<RawServer> {
  return request<RawServer>({
    method: "POST",
    url: import.meta.env.VITE_SERVER_URL + "/api" + Endpoints.serversEndpoint(),
    useToken: true,
    body: {name: serverName}
  });
}

export async function createInvite(serverId: string): Promise<any> {
  return request({
    method: "POST",
    url: import.meta.env.VITE_SERVER_URL + "/api" + Endpoints.serverInvitesEndpoint(serverId),
    useToken: true
  });
}

export async function joinServerByInviteCode(inviteCode: string) {
  return request<RawServer>({
    method: "POST",
    url: import.meta.env.VITE_SERVER_URL + "/api" + Endpoints.serverInviteCodeEndpoint(inviteCode),
    useToken: true
  });
}

export type ServerWithMemberCount = RawServer & { memberCount: number }; 


export async function serverDetailsByInviteCode(inviteCode: string) {
  return request<ServerWithMemberCount>({
    method: "GET",
    url: import.meta.env.VITE_SERVER_URL + "/api" + Endpoints.serverInviteCodeEndpoint(inviteCode),
  });
}
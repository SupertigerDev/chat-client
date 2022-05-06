import { request } from "./request";
import Endpoints from "./Endpoints";
import {RawServer} from 'chat-api/build/types/RawData'


export async function createInvite(serverId: string): Promise<any> {
  return request({
    method: "POST",
    url: "http://localhost:80/api" + Endpoints.serverInvitesEndpoint(serverId),
    useToken: true
  });
}

export async function joinServerByInviteCode(inviteCode: string) {
  return request<RawServer>({
    method: "POST",
    url: "http://localhost:80/api" + Endpoints.serverInviteCodeEndpoint(inviteCode),
    useToken: true
  });
}

export type ServerWithMemberCount = RawServer & { memberCount: number }; 


export async function serverDetailsByInviteCode(inviteCode: string) {
  return request<ServerWithMemberCount>({
    method: "GET",
    url: "http://localhost:80/api" + Endpoints.serverInviteCodeEndpoint(inviteCode),
  });
}
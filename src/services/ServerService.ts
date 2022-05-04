import { request } from "./request";
import Endpoints from "./Endpoints";



export async function createInvite(serverId: string): Promise<any> {
  return request({
    method: "POST",
    url: "http://localhost:80/api" + Endpoints.serverInvitesEndpoint(serverId),
    useToken: true
  });
}
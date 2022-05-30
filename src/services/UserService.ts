import { request } from "./request";
import Endpoints from "./Endpoints";
import env from "../common/env";



// Returns {token}
// error returns {path?, message}
export async function loginRequest(email: string, password: string): Promise<{token: string}> {
  return request({
    url: env.SERVER_URL + "/api" + Endpoints.loginEndpoint(),
    method: "POST",
    body: {
      email,
      password
    }
  });
}
export async function registerRequest(email: string, username: string, password: string): Promise<{token: string}> {
  return request({
    url: env.SERVER_URL + "/api" + Endpoints.registerEndpoint(),
    method: "POST",
    body: {
      email,
      username,
      password
    }
  });
}
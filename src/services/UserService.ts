import { request } from "./request";
import Endpoints from "./Endpoints";



// Returns {token}
// error returns {path?, message}
export async function loginRequest(email: string, password: string): Promise<{token: string}> {
  return request({
    url: import.meta.env.VITE_SERVER_URL + "/api" + Endpoints.loginEndpoint(),
    method: "POST",
    body: {
      email,
      password
    }
  });
}
export async function registerRequest(email: string, username: string, password: string): Promise<{token: string}> {
  return request({
    url: import.meta.env.VITE_SERVER_URL + "/api" + Endpoints.registerEndpoint(),
    method: "POST",
    body: {
      email,
      username,
      password
    }
  });
}
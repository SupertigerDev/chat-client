import Endpoints from "./Endpoints";

interface RequestOpts {
  url: string;
  method: string;
  body?: any;

}

async function request (opts: RequestOpts) {
  const response = await fetch(opts.url, {
    method: opts.method,
    body: JSON.stringify(opts.body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(err => { throw {message: "Could not connect to server. " + err.message} });
  if (!response.ok) {
    throw await response.json();
  }
  return await response.json();
}

// Returns {token}
// error returns {path?, message}
export async function loginRequest(email: string, password: string): Promise<{token: string}> {
  return request({
    url: "http://localhost:80/api" + Endpoints.loginEndpoint(),
    method: "POST",
    body: {
      email,
      password
    }
  });
}
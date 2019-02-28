import * as Cookies from "js-cookie";
import { ApiConfig } from "./ApiConfig";

interface ILoginJson {
  LoginUserResult: ILoginUserResult;
}

export interface ILoginUserResult {
  DisplayType: number;
  SessionValue: string;
  StudioPortal: boolean;
}
// this is added in a set-cookie header, whether or not we had good creds!!:

// const SESSION_ID_COOKIE = "TdsSessionId";
const SESSION_ID_COOKIE = "DecisionsSessionID";
const USER_COOKIE = "DecisionsUsername";

// TODO API call to call on load, to ping with a session ID to find out if it's valid?

/**
 * Auth and session related API calls.
 */
export const AuthApi = {
  /**
   * @return the current session ID (stored in a session cookie)
   */
  getSessionId: () => Cookies.get(SESSION_ID_COOKIE),
  /**
   * Current username
   */
  getSessionUserName: () => Cookies.get(USER_COOKIE),
  /**
   * Make REST call to log in.
   * @return promise that resolves the cookie.
   */
  login: (userid: string, password: string) =>
    new Promise<string>((resolve, reject) =>
      fetch(`${ApiConfig.restRoot}REST/AccountService/LoginUser`, {
        body: JSON.stringify({ userid, password, outputType: "JSON" }),
        method: "POST",
        mode: ApiConfig.getFetchMode()
      })
        .then(response =>
          // TODO check response status, prior to trying to parse JSON to avoid error
          // TODO use normal decisions cookie, but _clear_ it, if it's not a good session
          response.json().then((json: ILoginJson) => {
            const id = sessionIdSelector(json.LoginUserResult);
            Cookies.set(SESSION_ID_COOKIE, id);
            // USER_COOKIE was being set by request headers before, or so I thought.
            // not today... maybe because configuration is now CORS?
            Cookies.set(USER_COOKIE, userid);
            resolve(id);
          })
        )
        .catch(reason => {
          reject(reason);
        })
    ),

  logout: () => Cookies.remove(SESSION_ID_COOKIE)
};

export const sessionIdSelector = (loginResult: ILoginUserResult) =>
  loginResult.SessionValue;

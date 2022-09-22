import { getRestPath } from "@decisions/api-helpers";
import { AuthApi } from "@decisions/api-helpers/AuthApi";

export const MII_API_PATH = "insurance/instruments/";
//insurance/instruments/apply/
//address/normalize/

export function getMiiPath(path: string, forGet?: boolean) {
  return forGet
    ? `${getRestPath(MII_API_PATH)}${path}?sessionId=${AuthApi.getSessionId()}`
    : `${getRestPath(MII_API_PATH)}${path}`;
}

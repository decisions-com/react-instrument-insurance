import { ApiConfig } from "./ApiConfig";
import { AuthApi } from "./AuthApi";

export function getReportUrl(reportId: string) {
  return getUrlWithSessionId("ReportId", reportId);
}

export function getFlowIdUrl(flowId: string) {
  return getUrlWithSessionId("FlowId", flowId);
}

/**
 * Creates Flow url for a flow reference by "Alias". Assumes this was done to create
 * "pretty" paths and that the provided url is not
 * @param flowAlias create a flow URL based on alias
 */
export function getFlowAliasUrl(flowAlias: string) {
  // do not presume alias (from our JS point of view) is URL encoded
  return getUrlWithSessionId("FlowAlias", encodeURIComponent(flowAlias));
}

export function getServiceEndPointUrl(path: string) {
  const sessionId = AuthApi.getSessionId();
  return `${
    ApiConfig.restRoot
  }REST/${path}?outputtype=JSON&sessionId=${sessionId}`;
}

/**
 * Get a formatted URL, including current session ID
 * @param type "ReportId" | "FlowId" | "FlowAlias" depending on what's being fetched
 * @param id id, path, or alias, depending on the integration type.
 * @return url with sessionId query parameter appended.
 */
export function getUrlWithSessionId(
  type: "ReportId" | "FlowId" | "FlowAlias",
  id: string
) {
  const sessionId = AuthApi.getSessionId(); // TODO escape?
  return `${
    ApiConfig.restRoot
  }?${type}=${id}&Action=api&outputtype=JSON&sessionId=${sessionId}`;
}

type ResolvingCallback<T> = (json: T) => void;

type Reject = (reason?: any) => void;

const JSON = "JSON";

/**
 * Handle edge cases where odd behavior from the Decisions (5.x) back-end and the
 * odd behaviors of the TypeScript fetch API collide. Namely, 500s and 403s are still
 * getting passed to the `.then` block of the fetch promise, and the response from
 * the decisions back-end for those error codes is a non-JSON string.
 *
 * @param resolvingCallback callback to parse data out and resolve the promise as
 *        the use-case demands
 * @param reject promise reject callback to reject due to API errors.
 */
export function getResponseJson<T>(
  response: Response,
  resolvingCallback: ResolvingCallback<T>,
  reject: Reject
) {
  const contentType = response.headers.get("content-type");
  if (isJsonContentType(contentType)) {
    response.json().then(resolvingCallback);
  } else {
    reject(response);
  }
}

function isJsonContentType(contentType: string | null) {
  return !contentType ? false : contentType.toUpperCase().includes(JSON);
}

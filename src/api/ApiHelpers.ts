import { ApiConfig } from "./ApiConfig";
import { AuthApi } from "./AuthApi";

export function getReportUrl(reportId: string) {
  return getUrlWithSessionId("ReportId", reportId);
}

export function getFlowIdUrl(flowId: string) {
  return getUrlWithSessionId("FlowId", flowId);
}

export function getRuleIdUrl(ruleId: string) {
  return getUrlWithSessionId("RuleId", ruleId, "Json");
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
  type: "ReportId" | "FlowId" | "FlowAlias" | "RuleId",
  id: string,
  output: "Json" | "RawJson" = "RawJson"
) {
  const sessionId = AuthApi.getSessionId(); // TODO escape?
  return `${
    ApiConfig.restRoot
  }?${type}=${id}&Action=api&outputtype=${output}&sessionId=${sessionId}`;
}

type ResolvingCallback<T> = (json: T) => void;

type Reject = (reason?: any) => void;

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

/**
 * Convenience function to have 'null' query params for empty strings.
 *
 * Some end-points don't handle empty-string query params.
 * Most UIs don't handle 'null' input values.
 * @param param to encode
 * @returns encoded part or null.
 */
export function encodeWithNullForEmpty(param: string) {
  return param ? encodeURIComponent(param) : "null";
}

/**
 * Covers some idiosyncracies in the Decisions API, related to return types,
 * and common result wrappers.
 * @param url to fetch
 * @param propertyName to pull data from, if provided
 * @returns promise resolving expected type
 */
export function getWrappedFetch<T>(url: string, propertyName?: string) {
  return new Promise<T>(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        mode: ApiConfig.getFetchMode()
      });
      return getResponseJson(
        response,
        (json: any) => {
          return propertyName ? resolve(json[propertyName]) : resolve(json);
        },
        reject
      );
    } catch (reason) {
      reject(reason);
    }
  });
}

// DRY this up with the above
export function getWrappedPostFetch<T>(
  url: string,
  body: Object,
  propertyName?: string
) {
  return new Promise<T>(async (resolve, reject) => {
    try {
      const response = await fetch(url, makePostFetchInit(body));
      return getResponseJson(
        response,
        (json: any) => {
          return propertyName ? resolve(json[propertyName]) : resolve(json);
        },
        reject
      );
    } catch (reason) {
      reject(reason);
    }
  });
}

export function makePostFetchInit(body: Object): RequestInit {
  return {
    body: JSON.stringify({ outputtype: "RawJson", ...body }),
    method: "POST",
    mode: ApiConfig.getFetchMode()
  };
}

function isJsonContentType(contentType: string | null) {
  return !contentType ? false : contentType.toUpperCase().includes("JSON");
}

import {
  getFlowIdUrl,
  getServiceEndPointUrl,
  getResponseJson
} from "./ApiHelpers";
import { ApiConfig } from "./ApiConfig";

interface InstrumentSubTypesResult {
  "Instrument Sub Types": string[];
}

export function getInstrumentSubTypes(type: string) {
  return (
    getFlowIdUrl("ed453b1e-ccad-11e4-8284-bc305be74ca") +
    `&InstrumentType=${type}`
  );
}

export const getSubTypes = (type: string): Promise<string[]> =>
  getWrappedFetch(getInstrumentSubTypes(type));

function getWrappedFetch<T>(url: string) {
  return new Promise<T>((resolve, reject) => {
    return fetch(url, {
      mode: ApiConfig.getFetchMode()
    })
      .then(response =>
        getResponseJson(
          response,
          (json: T) => {
            return resolve(json);
          },
          reject
        )
      )
      .catch(reason => {
        reject(reason);
      });
  });
}

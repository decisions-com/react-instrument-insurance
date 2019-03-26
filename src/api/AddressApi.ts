import { getFlowIdUrl, getWrappedFetch } from "./ApiHelpers";
import { pipe } from "ramda";

/* Exports */

export const fetchCityStateFromZip = (zip: string) =>
  pipe(
    getCityStateFromZipUrl,
    getWrappedFetch
  )(zip) as Promise<CityStateResult>;

export function fetchCanNormalizeAddress(address: CanNormalizeAddressArg) {
  return getWrappedFetch<boolean>(
    getCanNormalizeAddressUrl(address),
    "Normalize"
  );
}

/* helpers */

const GET_CITY_STATE_FROM_ZIP_FLOW_ID = "473cb62a-cb42-11e4-90d4-005056c00008";
function getCityStateFromZipUrl(zip: string) {
  return getFlowIdUrl(GET_CITY_STATE_FROM_ZIP_FLOW_ID) + `&ZipCode=${zip}`;
}

const CAN_NORMALIZE_URL_FLOW_ID = "e4825570-f0af-11e7-abdf-1a4f32f7a749";

function getCanNormalizeAddressUrl({
  address1,
  address2,
  city,
  state
}: CanNormalizeAddressArg) {
  return (
    getFlowIdUrl(CAN_NORMALIZE_URL_FLOW_ID) +
    `&Address1=${address1}&Address2=${address2}&City=${city}&State=${state}`
  );
}

/* types */

export interface CityStateResult {
  "City Name": string;
  "State Name": string;
}

export interface CanNormalizeAddressArg {
  address1: string;
  address2: string;
  city: string;
  state: string;
}

export interface CanNormalizeAddressResult {
  Normalize: boolean;
}

import {
  getFlowIdUrl,
  getWrappedFetch,
  encodeWithNullForEmpty,
  getWrappedPostFetch,
  getRuleIdUrl,
} from "@decisions/api-helpers/ApiHelpers";
import { pipe } from "ramda";

/* Exports */

export const fetchCityStateFromZip = (zip: string) =>
  pipe(
    getCityStateFromZipUrl,
    getWrappedFetch
  )(zip) as Promise<CityStateResult>;

export function fetchCanNormalizeAddress(address: CanNormalizeAddressArg) {
  return getWrappedFetch<{ result: boolean }>(getAddressIsCompleteUrl(address));
}

export function postDoNormalize(body: UspsNormalizedAddressBody) {
  return getWrappedPostFetch<UspsNormalizedAddressResult>(
    getFlowIdUrl("a2dc8a52-1a0a-11eb-8422-00155d641900"),
    body
  );
}

/* helpers */

const FILL_IN_ADRESS_CITY_STATE = "ec2cb54c-13d4-11eb-b2cc-98e743cdd00e";
function getCityStateFromZipUrl(zip: string) {
  return (
    getFlowIdUrl(FILL_IN_ADRESS_CITY_STATE) +
    `&ZipCode=${encodeURIComponent(zip)}`
  );
}

const ADDRESS_IS_COMPLETE_RULE_ID = "0ad4275e-707d-43ed-8adb-81d0ddc62601";

function getAddressIsCompleteUrl({
  address1,
  address2,
  city,
  state,
  ZipCode,
}: CanNormalizeAddressArg) {
  address1 = encodeWithNullForEmpty(address1);
  address2 = encodeWithNullForEmpty(address2);
  city = encodeWithNullForEmpty(city);
  state = encodeWithNullForEmpty(state);
  ZipCode = encodeWithNullForEmpty(state);

  return (
    getRuleIdUrl(ADDRESS_IS_COMPLETE_RULE_ID) +
    `&Address1=${address1}&Address2=${address2}&City=${city}&State=${state}&Zipcode=${ZipCode}`
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
  ZipCode: string;
}

export interface CanNormalizeAddressResult {
  Normalize: boolean;
}

export interface UspsNormalizedAddressResult {
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  ZipCode: string;
}

export interface UspsNormalizedAddressBody {
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  DoNormalize?: string; // new one doesn't take this input?
  ZipCode: string;
}

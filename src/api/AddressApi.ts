import {
  encodeWithNullForEmpty,
  getWrappedFetch,
  getWrappedPostFetch,
} from "@decisions/api-helpers/ApiHelpers";
import { getMiiPath } from "./ApiContants";

/* Exports */

export const fetchCityStateFromZip = (ZipCode: string) =>
  getWrappedPostFetch(getMiiPath("address/city-state/"), {
    ZipCode,
  }) as Promise<CityStateResult>;

export function fetchCanNormalizeAddress(address: CanNormalizeAddressArg) {
  const { address1, address2, city, state, ZipCode } = address;

  return getWrappedFetch<{ result: boolean }>(
    getMiiPath("address/is-complete/", true) +
      "&" +
      [
        "Address1=" + encodeWithNullForEmpty(address1),
        "Address2=" + encodeWithNullForEmpty(address2),
        "City=" + encodeWithNullForEmpty(city),
        "State=" + encodeWithNullForEmpty(state),
        "Zipcode=" + encodeWithNullForEmpty(ZipCode),
      ].join("&")
  );
  // BUG with rule not returning valid JSON, but a string "response: True" over POST
  /* return getWrappedPostFetch<{ result: "True" | "False" }>(
    getMiiPath("address/is-complete/"),
    {
      Address1: address1,
      Address2: address2,
      City: city,
      State: state,
      Zipcode: ZipCode,
    }
  ); */
}

export function postDoNormalize(body: UspsNormalizedAddressBody) {
  return getWrappedPostFetch<UspsNormalizedAddressResult>(
    getMiiPath("address/normalize/"),
    body
  );
}

/* helpers */

/* types */

export interface CityStateResult {
  City: string;
  State: string;
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

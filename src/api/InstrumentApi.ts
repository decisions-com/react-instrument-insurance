import {
  getFlowIdUrl,
  getRuleIdUrl,
  getWrappedFetch,
  getWrappedPostFetch,
} from "@decisions/api-helpers/ApiHelpers";
import { getMiiPath } from "./ApiContants";
import { CustomerHistorySummary } from "./BackgroundApi";
import { PolicyApplication } from "./SubmitApi";

// main flow, for reference:
// http://localhost/decisions/Primary/StudioH/?FolderId=92cbb934-cb2f-11e4-90d4-005056c00008&pageName=List&flowId=a9cc6d4e-cb2f-11e4-90d4-005056c00008&action=edit

export function getInstrumentSubTypesUrl(type: string) {
  return (
    getFlowIdUrl("885d7f63-fe9a-11ea-a1fb-b42e99a2ceb0") +
    `&InstrumentType=${type}`
  );
}

export function fetchMakes(instrumentType: string) {
  return getWrappedPostFetch<{
    Make: string[];
  }>(getFlowIdUrl("c23a3ae9-1edd-11eb-8423-00155d641900", "POST"), {
    InstrumentType: instrumentType,
  });
}

export function fetchModels(Make: string) {
  return getWrappedPostFetch<{
    Model: ["StringValue", "StringValue"];
  }>(getFlowIdUrl("39b3511d-1ee1-11eb-8423-00155d641900", "POST"), {
    Make,
  });
}

export const getSubTypes = (instrumentType: string) =>
  getWrappedFetch<string[]>(
    getInstrumentSubTypesUrl(instrumentType),
    "InstrumentSubTypes"
  );

export const getShowCase = (instrumentType: string) =>
  getWrappedFetch<boolean>(getShowCaseRuleUrl(instrumentType), "result");

export const selectionIsNotOther = (instrumentType: string) =>
  getWrappedFetch<boolean>(getSelectionIsNotOtherUrl(instrumentType), "result");
// practically don't need both above and below rules.
export const getHideOtherField = (instrumentType: string) =>
  getWrappedFetch<boolean>(getHideOtherUrl(instrumentType), "result");

// what's the icon grid? that's the rule name.
// export const getShowIconGrid = (fileData) => {}
// not doing this one... not going to send a base64 encoded image,
// just to check if it exists on the server side.

export const getRateCalc = (body: RateCalcBody) => {
  return getWrappedPostFetch<RateCalcResult>(getRateUrl(), body);
};

// we don't _need_ this either, because we don't have to upload it
// to get it to other parts of the page. we _will_ upload it during
// the get premium bit though.
export const uploadImage = (image: CustomerProvidedImage) => {
  return getWrappedPostFetch(getFileUploadUrl(), image);
};

function getShowCaseRuleUrl(instrumentType: string) {
  // rule is named "IsPiano" which is too specific, IMO.
  return `${getRuleIdUrl(
    "da46792a-5300-46c9-a1b8-c20b6b191382"
  )}&InstrumentType=${instrumentType}`;
}

function getHideOtherUrl(instrumentType: string) {
  // http://localhost/decisions/Primary/?RuleId=a341eed3-290c-4f0c-bf69-48487dc8c81c&Action=api&outputtype=RawJson&Selection=null
  return `${getRuleIdUrl(
    "a341eed3-290c-4f0c-bf69-48487dc8c81c"
  )}&InstrumentType=${instrumentType}`;
}
// we don't need both this and the above outside Decisions context.
function getSelectionIsNotOtherUrl(instrumentType: string) {
  return `${getRuleIdUrl(
    "f15f679a-15dc-4ee7-a7a8-d42830494118"
  )}&InstrumentType=${instrumentType}`;
}

// function getShowIconGridUrl(instrumentType: string) {
//   // http://localhost/decisions/Primary/?RuleId=a341eed3-290c-4f0c-bf69-48487dc8c81c&Action=api&outputtype=RawJson&Selection=null
//   return `${getRuleIdUrl(
//     "1ca7b0aa-b403-4c07-9770-348603d14104"
//   )}&Selection=${instrumentType}`;
// }
function getRateUrl() {
  // return getFlowIdUrl("fb6d8a62-fea0-11ea-a1fb-b42e99a2ceb0");
  return getMiiPath("rate-calculator/");
}
function getFileUploadUrl() {
  return getFlowIdUrl("a2607673-242b-11e6-80c4-00155d0aea03");
}

export interface ImageConfidence {
  ImageConfidence: string;
  Icon: string;
}

function fetchImageConfidence() {
  return getWrappedPostFetch<ImageConfidence>(
    getFlowIdUrl("64b1826c-0a66-11eb-a200-b42e99a2ceb0", "POST"),
    {
      outputtype: "Json",
      CustomerProvidedImage: {
        Id: "StringValue",
        FileName: "StringValue",
        // Contents: "AAA=", // we don't want to be sending the image contents, so probably need to do this a different way...
      },
      Instrument: "StringValue",
    }
  );
}

export function createImageObj(file: File): Promise<CustomerProvidedImage> {
  let reader = new FileReader();
  return new Promise<CustomerProvidedImage>((resolve, reject) => {
    reader.onloadend = () => {
      const parts = (reader.result as string).split(",");
      resolve({
        Id: "", // TODO
        FileName: file.name,
        Contents: parts[1],
        dataUrlTypeString: parts[0],
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export interface CustomerProvidedImage {
  Id: string;
  FileName: string;
  Contents: string | ArrayBuffer | null;
  dataUrlTypeString?: string;
}

export interface RateCalcBody {
  AddressState: string;
  ApplicantName: string;
  CaptureRuleHistory: boolean;
  CustomerProvidedImage?: CustomerProvidedImage | null;
  Deductible: number;
  FinancialRisk: string;
  GigsPerYear: number;
  HardCase: boolean;
  History: CustomerHistorySummary;
  InstrumentType: string;
  Make: string;
  Model: string;
  ProfessionalUse: boolean;
  PurchasePrice: number;
  ReplacementCost: number;
  Storage: string;
  UniqueProcessId: string;
  YearMade: string | number;
  PolicyApp: PolicyApplication;
}

export interface RateCalcResult {
  AdjustedPremium: number;
  PhotoDiscount: boolean;
  PhotoDiscountValue: string;
  ExistingCustomerDiscountValue: string;
  ExistingCustomerDiscount: boolean;
  LocationDiscount: boolean;
  LocationDiscountValue: string;
  SafeStorageDiscount: boolean;
  SafeStorageDiscountValue: string;
  TotalDiscount: string;
  NewModelDiscount: boolean;
  NewModelDiscountValue: string;
}

export function getDefaultRateCalcResult(): RateCalcResult {
  return {
    AdjustedPremium: 0,
    PhotoDiscount: false,
    PhotoDiscountValue: "",
    ExistingCustomerDiscountValue: "",
    ExistingCustomerDiscount: false,
    LocationDiscount: false,
    LocationDiscountValue: "",
    SafeStorageDiscount: false,
    SafeStorageDiscountValue: "",
    TotalDiscount: "",
    NewModelDiscount: false,
    NewModelDiscountValue: "",
  };
}

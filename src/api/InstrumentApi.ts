import {
  getFlowIdUrl,
  getRuleIdUrl,
  getWrappedFetch,
  getWrappedPostFetch
} from "@decisions/api-helpers/ApiHelpers";
import { PersonalHistory } from "./BackgroundApi";

// main flow, for reference:
// http://localhost/decisions/Primary/StudioH/?FolderId=92cbb934-cb2f-11e4-90d4-005056c00008&pageName=List&flowId=a9cc6d4e-cb2f-11e4-90d4-005056c00008&action=edit

export function getInstrumentSubTypesUrl(type: string) {
  return (
    getFlowIdUrl("ed453b1e-ccad-11e4-8284-bc305be74ca8") +
    `&InstrumentType=${type}`
  );
}

export const getSubTypes = (instrumentType: string) =>
  getWrappedFetch<string[]>(
    getInstrumentSubTypesUrl(instrumentType),
    "Instrument Sub Types"
  );

export const getShowCase = (instrumentType: string) =>
  getWrappedFetch<boolean>(getShowCaseRuleUrl(instrumentType), "result");

export const selectionIsOther = (instrumentType: string) =>
  getWrappedFetch<boolean>(getSelectionIsOtherUrl(instrumentType), "result");
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
    "3d1a7b88-b227-4b11-a063-a2499410a085"
  )}&Selection=${instrumentType}`;
}

function getHideOtherUrl(instrumentType: string) {
  // http://localhost/decisions/Primary/?RuleId=a341eed3-290c-4f0c-bf69-48487dc8c81c&Action=api&outputtype=RawJson&Selection=null
  return `${getRuleIdUrl(
    "a341eed3-290c-4f0c-bf69-48487dc8c81c"
  )}&Selection=${instrumentType}`;
}
// we don't need both this and the above outside Decisions context.
function getSelectionIsOtherUrl(instrumentType: string) {
  return `${getRuleIdUrl(
    "465e4c3d-4932-4645-83c9-0dceb4c9276a"
  )}&Selection=${instrumentType}`;
}

// function getShowIconGridUrl(instrumentType: string) {
//   // http://localhost/decisions/Primary/?RuleId=a341eed3-290c-4f0c-bf69-48487dc8c81c&Action=api&outputtype=RawJson&Selection=null
//   return `${getRuleIdUrl(
//     "1ca7b0aa-b403-4c07-9770-348603d14104"
//   )}&Selection=${instrumentType}`;
// }
function getRateUrl() {
  return getFlowIdUrl("6062e203-cf98-11e7-abd9-1a4f32f7a749");
}
function getFileUploadUrl() {
  return getFlowIdUrl("a2607673-242b-11e6-80c4-00155d0aea03");
}

export function createImageObj(file: File): Promise<CustomerProvidedImage> {
  let reader = new FileReader();
  return new Promise<CustomerProvidedImage>((resolve, reject) => {
    reader.onloadend = () => {
      const parts = (reader.result as string).split(",");
      resolve({
        FileName: file.name,
        Contents: parts[1],
        dataUrlTypeString: parts[0]
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export interface CustomerProvidedImage {
  FileName: string;
  Contents: string | ArrayBuffer | null;
  dataUrlTypeString?: string;
}

export interface RateCalcBody {
  YearMade: number;
  Storage: string;
  "Replacement Cost": number;
  "Hard Case": boolean;
  Deductible: number;
  GigsPerYear: number;
  ProfessionalUse: boolean;
  CustomerProvidedImage?: CustomerProvidedImage | null;
  PurchasePrice: number;
  "InstrumentType ": string;
  "Financial Risk": string;
  Make: string;
  Model: string;
  History: PersonalHistory;
}

export interface RateCalcResult {
  RichTextForAverageCalculation: string;
  AdjustedPremium: number;
  ImageConfidence: string;
  Icon: string; // base64 encoded image
  PropertyRisk: string;
}

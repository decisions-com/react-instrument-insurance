import { CustomerProvidedImage } from "./InstrumentApi";
import { CustomerHistorySummary } from "./BackgroundApi";
import {
  getFlowIdUrl,
  getWrappedPostFetch,
} from "@decisions/api-helpers/ApiHelpers";

export function submitApplication(
  policyApp: PolicyApplication,
  history: CustomerHistorySummary,
  adjustedPremium: number,
  totalDiscount: number,
  photo?: CustomerProvidedImage
) {
  const url = getFlowIdUrl("4322b204-525e-11e9-b50e-802bf99b288c");
  const body: ApplicationBody = {
    PolicyApp: policyApp,
    History: history,
    CustomerPhoto: photo || null,
    AdjustedPremium: adjustedPremium,
    TotalDiscount: totalDiscount,
  };
  return getWrappedPostFetch<string>(url, body, "confirmation");
}

export interface ApplicationBody {
  PolicyApp: PolicyApplication;
  History: CustomerHistorySummary;
  CustomerPhoto: CustomerProvidedImage | null; // must be defined on body, but can be null
  AdjustedPremium: number;
  TotalDiscount: number;
}

export interface PolicyApplication {
  AddressState: string;
  ApplicantEmail: string;
  ApplicantFirstName: string;
  ApplicantLastName: string;
  ApplicantZipCode: string;
  City: string;
  CreatedDate: Date;
  CustomerProvidedImage?: CustomerProvidedImage | null;
  Deductible: number;
  Deleted: boolean;
  DeletedBy: string;
  DeletedOn: Date;
  ExtensionId: string;
  FinancialRisk: string;
  GigsPerYear: number;
  HardCase: boolean;
  Id: string;
  InstrumentSubType: string;
  InstrumentType: string;
  LimitedEdition: boolean;
  Make: string;
  Model: string;
  PremiumValue: number;
  PrimaryUser: boolean;
  PropertyRisk: string;
  PurchasePrice: number;
  ReplacementCost: number;
  StorageLocation: string;
  StreetAddress1: string;
  StreetAddress2: string;
  TotalRuleTime: number;
  TypeOfTransport: string;
  Underwriter: string;
  UsedProfessionally: boolean;
  YearMade: string;
}

// {
//   AddressState: string;
//   ApplicantName: string;
//   CaptureRuleHistory: boolean;
//   CustomerProvidedImage?: CustomerProvidedImage | null;
//   Deductible: number;
//   FinancialRisk: string;
//   GigsPerYear: number;
//   HardCase: boolean;
//   History: CustomerHistorySummary;
//   InstrumentType: string;
//   Make: string;
//   Model: string;
//   ProfessionalUse: boolean;
//   PurchasePrice: number;
//   ReplacementCost: number;
//   Storage: string;
//   UniqueProcessId: string;
//   YearMade: string | number;
// }

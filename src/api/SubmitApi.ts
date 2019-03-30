import { CustomerProvidedImage } from "./InstrumentApi";
import { PersonalHistory } from "./BackgroundApi";
import { getFlowIdUrl, getWrappedPostFetch } from "./ApiHelpers";

export function submitApplication(
  policyApp: PolicyApp,
  history: PersonalHistory,
  photo?: CustomerProvidedImage
) {
  const url = getFlowIdUrl("4322b204-525e-11e9-b50e-802bf99b288c");
  const body: ApplicationBody = {
    PolicyApp: policyApp,
    History: history,
    CustomerPhoto: photo
  };
  return getWrappedPostFetch(url, body);
}

export interface ApplicationBody {
  PolicyApp: PolicyApp;
  History: PersonalHistory;
  CustomerPhoto?: CustomerProvidedImage;
}

export interface PolicyApp {
  FinancialRisk: string;
  PropertyRisk: string;
  PremiumValue: number;
  CustomerProvidedImage: string | null;
  ApplicantEmail: string;
  AddressState: string;
  City: string;
  GigsPerYear: number;
  StreetAddress: string;
  ReplacementCost: number;
  PurchasePrice: number;
  InstrumentSubType: string;
  InstrumentType: string;
  Deductible: number;
  UsedProfessionally: boolean;
  YearMade: string;
  HardCase: boolean;
  ApplicantLastName: string;
  ApplicantFirstName: string;
  ApplicantZipCode: string;
  StorageLocation: string;
  TypeOfTransport: string;
  Make: string;
  Model: string;
  Id: string;
  ExtensionId: string;
  Deleted: boolean;
  DeletedBy: string;
  DeletedOn: Date;
}

import {
  getFlowIdUrl,
  encodeWithNullForEmpty,
  getWrappedFetch,
  getWrappedPostFetch,
} from "@decisions/api-helpers/ApiHelpers";
import { PolicyApplication } from "./SubmitApi";

const CREDIT_REPORTING_ID = "3a35ce1e-fe90-11ea-a1fb-b42e99a2ceb0";

// this flow is a NOOP right now, skipping:
// const CRIME_REPORTING_ID = "56c91b53-fe90-11ea-a1fb-b42e99a2ceb0";
/*
http://localhost:8081/Primary/restapi/Flow/56c91b53-fe90-11ea-a1fb-b42e99a2ceb0
outputtype: JSON
{
  "outputtype": "Json"
}
*/

const CUSTOMER_HISTORY_ID = "08da8a7c-2b9c-5a41-0c99-39085401e11c";

/* Exports */

interface IGetHistoryAndApplicationBody {
  DateOfBirth?: Date;
  PhoneNumber: string;
  FirstName: string;
  LastName: string;
  Email: string;
  StreetAddress: string;
  City: string;
  State: string;
  Zip: string;
  AptOrUnit: string;
}

export function doBackgroundChecks(body: IGetHistoryAndApplicationBody) {
  return getHistoryReport(body);
}

export function getCreditReport(
  firstName: string,
  lastName: string,
  streetAddress: string,
  postalCode: string
) {
  return getWrappedFetch<CreditHistoryResult>(
    getCreditReportUrl(firstName, lastName, streetAddress, postalCode)
  );
}

export function getHistoryReport(body: IGetHistoryAndApplicationBody) {
  return getWrappedPostFetch<PersonalHistoryResult>(
    getHistoryReportUrl(),
    body
  );
}

/* hoisted helpers */

function getCreditReportUrl(
  firstName: string,
  lastName: string,
  streetAddress: string,
  postalCode: string
) {
  return [
    getFlowIdUrl(CREDIT_REPORTING_ID),
    "&FirstName=",
    encodeWithNullForEmpty(firstName),
    "&LastName=",
    encodeWithNullForEmpty(lastName),
    "&StreetAddress=",
    encodeWithNullForEmpty(streetAddress),
    "&PostalCode=",
    encodeWithNullForEmpty(postalCode),
  ].join("");
}

function getHistoryReportUrl() {
  return getFlowIdUrl(CUSTOMER_HISTORY_ID);
}

export function getBaseCredit(): CreditHistoryResult {
  return {
    "Reported Income": 0,
    "Credit Report": {
      Score: 0,
      LiabilityOldestDate: new Date(),
      LiabilityOldestCreditorName: "",
      MortgageCount: 0,
      MortgageBalance: 0,
      MortgagePayment: 0,
      MortgagePastDue: 0,
      MortgageHighCredit: 0,
      InstallmentCount: 0,
      InstallmentBalance: 0,
      InstallmentPayment: 0,
      InstallmentPastDue: 0,
      InstallmentHighCredit: 0,
      InstallmentOtherCount: 0,
      InstallmentOtherBalance: 0,
      InstallmentOtherPayment: 0,
      InstallmentOtherPastDue: 0,
      InstallmentOtherHighCredit: 0,
      AutoCount: 0,
      AutoBalance: 0,
      AutoPayment: 0,
      AutoPastDue: 0,
      AutoHighCredit: 0,
      EducationCount: 0,
      EducationBalance: 0,
      EducationPayment: 0,
      EducationPastDue: 0,
      EducationHighCredit: 0,
      OpenCount: 0,
      OpenBalance: 0,
      OpenPayment: 0,
      OpenPastDue: 0,
      OpenHighCredit: 0,
      RevolvingCount: 0,
      RevolvingBalance: 0,
      RevolvingPayment: 0,
      RevolvingPastDue: 0,
      RevolvingHighCredit: 0,
      UnknownCount: 0,
      UnknownBalance: 0,
      UnknownPayment: 0,
      UnknownPastDue: 0,
      UnknownHighCredit: 0,
      TotalLiabilityCount: 0,
      TotalLiabilityBalance: 0,
      TotalLiabilityPayment: 0,
      TotalLiabilityPastDue: 0,
      TotalLiabilityHighCredit: 0,
      BorrowerID: "",
      _Name: "",
    },
  };
}

/* Types */

export interface BackgroundCheck {
  history: CustomerHistorySummary;
  credit: CreditHistoryResult;
}

export interface CustomerHistorySummary {
  LatePayments180Days: number;
  ClaimsCount180Days: number;
  LifetimeClaimCount: number;
  ClaimValue180Days: number;
  LifetimeClaimValue: number;
  CustomerServiceWarning: boolean;
  CustomerSinceDate: Date;
  NumberOfActivePolicies: number;
  NearestPolicyExpiration: Date;
  TotalMonthlyPremiumValue: number;
  LifetimeValue: number;
}

export interface PersonalHistoryResult {
  History: CustomerHistorySummary;
  PolicyApplication: PolicyApplication;
}

export interface CreditHistoryResult {
  "Reported Income": number;
  "Credit Report": {
    Score: number;
    LiabilityOldestDate: Date;
    LiabilityOldestCreditorName: string;
    MortgageCount: number;
    MortgageBalance: number;
    MortgagePayment: number;
    MortgagePastDue: number;
    MortgageHighCredit: number;
    InstallmentCount: number;
    InstallmentBalance: number;
    InstallmentPayment: number;
    InstallmentPastDue: number;
    InstallmentHighCredit: number;
    InstallmentOtherCount: number;
    InstallmentOtherBalance: number;
    InstallmentOtherPayment: number;
    InstallmentOtherPastDue: number;
    InstallmentOtherHighCredit: number;
    AutoCount: number;
    AutoBalance: number;
    AutoPayment: number;
    AutoPastDue: number;
    AutoHighCredit: number;
    EducationCount: number;
    EducationBalance: number;
    EducationPayment: number;
    EducationPastDue: number;
    EducationHighCredit: number;
    OpenCount: number;
    OpenBalance: number;
    OpenPayment: number;
    OpenPastDue: number;
    OpenHighCredit: number;
    RevolvingCount: number;
    RevolvingBalance: number;
    RevolvingPayment: number;
    RevolvingPastDue: number;
    RevolvingHighCredit: number;
    UnknownCount: number;
    UnknownBalance: number;
    UnknownPayment: number;
    UnknownPastDue: number;
    UnknownHighCredit: number;
    TotalLiabilityCount: number;
    TotalLiabilityBalance: number;
    TotalLiabilityPayment: number;
    TotalLiabilityPastDue: number;
    TotalLiabilityHighCredit: number;
    BorrowerID: string;
    _Name: string;
  };
}

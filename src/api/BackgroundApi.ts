import {
  getFlowIdUrl,
  encodeWithNullForEmpty,
  getWrappedFetch,
} from "@decisions/api-helpers/ApiHelpers";
import { pipe } from "ramda";

const CREDIT_REPORTING_ID = "3a35ce1e-fe90-11ea-a1fb-b42e99a2ceb0";
// http://localhost:8081/Primary/restapi/Flow/3a35ce1e-fe90-11ea-a1fb-b42e99a2ceb0
/* {
  "outputtype": "Json"
} */

// this flow is a NOOP right now, skipping:
// const CRIME_REPORTING_ID = "f36cd65c-9d72-11e8-9672-509a4c510032";
/*
http://localhost:8081/Primary/restapi/Flow/56c91b53-fe90-11ea-a1fb-b42e99a2ceb0
outputtype: JSON
{
  "outputtype": "Json"
}
*/

const CUSTOMER_HISTORY_ID = "791e5f31-fe90-11ea-a1fb-b42e99a2ceb0";
/*
http://localhost:8081/Primary/restapi/Flow/791e5f31-fe90-11ea-a1fb-b42e99a2ceb0 //< had to turn on REST integration for this. It was not already on.
outputtype: JSON
{
  "outputtype": "Json"
}

{
  "Done": {
    "History": {
      "LifetimeValue": 0,
      "TotalMonthlyPremiumValue": 0,
      "NearestPolicyExpiration": "0001-01-01T00:00:00",
      "NumberOfActivePolicies": 0,
      "CustomerSinceDate": "0001-01-01T00:00:00",
      "CustomerServiceWarning": false,
      "LifetimeClaimValue": 0,
      "ClaimValue180Days": 0,
      "LifetimeClaimCount": 0,
      "ClaimsCount180Days": 0,
      "LatePayments180Days": 0
    }
  }
}
*/

/* Exports */

export function doBackgroundChecks(
  firstName: string,
  lastName: string,
  streetAddress: string,
  postalCode: string
) {
  let creditCheck: CreditHistoryResult | undefined;
  let historyCheck: PersonalHistory | undefined;

  return new Promise<BackgroundCheck>((resolve, reject) => {
    const resolveCheck = () => {
      if (creditCheck && historyCheck) {
        pipe(getBackgroundCheck, resolve)(creditCheck, historyCheck);
      }
    };

    getHistoryReport()
      .then((hist) => {
        historyCheck = hist;
        resolveCheck();
      })
      .catch((reason) => reject(reason));

    getCreditReport(firstName, lastName, streetAddress, postalCode)
      .then((credit) => {
        creditCheck = credit;
        resolveCheck();
      })
      .catch((reason) => reject(reason));
  });
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

export function getHistoryReport() {
  return getWrappedFetch<PersonalHistory>(getHistoryReportUrl(), "History");
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

function getBackgroundCheck(
  credit: CreditHistoryResult,
  history: PersonalHistory
): BackgroundCheck {
  return {
    credit,
    history,
  };
}

function getBaseCredit(): CreditHistoryResult {
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

function getBaseHistory(): PersonalHistory {
  return {
    LatePayments180Days: 0,
    ClaimsCount180Days: 0,
    LifetimeClaimCount: 0,
    ClaimValue180Days: 0,
    LifetimeClaimValue: 0,
    CustomerServiceWarning: false,
    CustomerSinceDate: new Date(),
    NumberOfActivePolicies: 0,
    NearestPolicyExpiration: new Date(),
    TotalMonthlyPremiumValue: 0,
    LifetimeValue: 0,
  };
}

/* Types */

export interface BackgroundCheck {
  history: PersonalHistory;
  credit: CreditHistoryResult;
}

export interface PersonalHistory {
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
  History: PersonalHistory;
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

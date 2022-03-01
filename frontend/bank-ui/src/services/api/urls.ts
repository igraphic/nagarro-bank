export const BASE_URL = process.env.REACT_APP_API_URI || "/api";

export const AUUTHENTICATE_URL = `${BASE_URL}/authenticate`;
export const FETCH_ACCOUNT_URL = `${BASE_URL}/accounts`;
export const fetchStatementsUrl = (accoundId: number) =>
  `${BASE_URL}/accounts/${accoundId}/statements`;
export const fetchAdminStatementsUrl = (
  accoundId: number,
  searchParams: string
) =>
  `${fetchStatementsUrl(
    accoundId
  )}/query?${searchParams}`;

import axios, { AxiosRequestConfig } from "axios";
import {
  AUUTHENTICATE_URL,
  fetchAdminStatementsUrl,
  fetchStatementsUrl,
  FETCH_ACCOUNT_URL,
} from "./urls";

export const authConfig = (
  username: string,
  password: string
): AxiosRequestConfig => ({
  method: "POST",
  url: AUUTHENTICATE_URL,
  data: {
    username,
    password,
  },
});

export const fetchStatementConfig = (
  token: string,
  accountId: number
): AxiosRequestConfig => ({
  method: "GET",
  url: fetchStatementsUrl(accountId),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchAdminStatementConfig = (
  token: string,
  accountId: number,
  searchParams: string
): AxiosRequestConfig => ({
  method: "GET",
  url: fetchAdminStatementsUrl(
    accountId,
    searchParams
  ),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchAccountsConfig = (token: string): AxiosRequestConfig => ({
  method: "GET",
  url: FETCH_ACCOUNT_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const withConfigRequest =
  (...configParameters: any) =>
  async (configFunction: any) => {
    const configObject = configFunction(...configParameters);
    return await makeRequest(configObject);
  };

const makeRequest = async (requestConfig: AxiosRequestConfig) => {
  console.log("requestConfig", requestConfig);

  try {
    const response = await axios(requestConfig);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

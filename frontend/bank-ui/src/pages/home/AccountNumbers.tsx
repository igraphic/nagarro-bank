import { FormControl, InputLabel, Select } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  withConfigRequest,
  fetchAccountsConfig,
} from "../../services/api/apiService";
import { IAccounts, IAccount } from "../../types/statement";

export default function AccountNumbers() {
  const { state } = useContext(AuthContext);
  const [accounts, setAccounts] = React.useState<IAccounts | null>(null);
  React.useEffect(() => {
    console.log(state);

    const fetchAccounts = async (token?: string | null) => {
      const accountList = await withConfigRequest(token)(fetchAccountsConfig);

      setAccounts(
        accountList.reduce((accObject: IAccounts, account: IAccount) => {
          let key = account.accountType;
          if (!accObject[key]) {
            accObject[key] = [];
          }
          accObject[key].push(account);
          return accObject;
        }, {})
      );
    };
    if (state.isAuthenticated && accounts === null) {
      fetchAccounts(state.accessToken);
    }
    console.log("accounts", accounts);
  }, [accounts, state]);
  return (
    <FormControl sx={{ my: 2, minWidth: 120 }}>
      <InputLabel htmlFor="grouped-native-select">Select Account</InputLabel>
      <Select
        native
        defaultValue=""
        label="Select Account"
        name="accountNumber"
        id="accountNumber"
        sx={{ width: 450 }}
        required
      >
        <option aria-label="None" value="" />
        {accounts &&
          Object.keys(accounts).map((type) => (
            <optgroup key={type} label={type}>
              {accounts[type].map((account) => (
                <option key={account.id} value={account.id}>
                  {account.accountNumber}{" "}
                </option>
              ))}
            </optgroup>
          ))}
      </Select>
    </FormControl>
  );
}

import { Box, Button, Container, CssBaseline, Stack } from "@mui/material";
import React, { useContext } from "react";
import Header from "../../components/header/Header";
import { AuthContext } from "../../context/AuthContext";
import StatementsTable from "./StatementsTable";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import {
  withConfigRequest,
  fetchStatementConfig,
  fetchAdminStatementConfig,
} from "../../services/api/apiService";
import { IStatement } from "../../types/statement";
import StatementAmountRange from "./StatementAmountRange";
import AccountNumbers from "./AccountNumbers";
import StatementDatePicker from "./StatementDatePicker";

const formatDateString = (date: string) => {
  const parts = date.split("/");
  return `${parts[2]}-${parts[0]}-${parts[1]}`;
};

const Home: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isAdmin = state.user?.roles.includes("Admin");
  const { isAuthenticated, accessToken } = state;
  const matchAccountId = useMatch({
    path: `/accounts/:accountId`,
    end: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const accountId = matchAccountId?.params.accountId;
  const [statements, setStatements] = React.useState<IStatement[]>([]);
  React.useEffect(() => {
    const startDate = searchParams.get("startDate");

    const endDate = searchParams.get("endDate");

    const minAmount = searchParams.get("minAmount");

    const maxAmount = searchParams.get("maxAmount");

    const fetchStatements = async (
      accountId: number,
      token?: string | null
    ) => {
      setStatements(
        await withConfigRequest(token, accountId)(fetchStatementConfig)
      );
    };

    const fetchAdminStatements = async (
      accountId: number,
      searchParams: string,
      token?: string | null
    ) => {
      setStatements(
        await withConfigRequest(
          token,
          accountId,
          searchParams
        )(fetchAdminStatementConfig)
      );
    };

    if (isAuthenticated && accountId) {
      if (isAdmin) {
        let searchParams = "";
        if (startDate) {
          searchParams = `${searchParams}&startDate=${formatDateString(
            startDate
          )}`;
        }
        if (endDate) {
          searchParams = `${searchParams}&endDate=${formatDateString(
            endDate
          )}`;
        }
        if (minAmount) {
          searchParams = `${searchParams}&minAmount=${minAmount}`;
        }
        if (maxAmount) {
          searchParams = `${searchParams}&maxAmount=${maxAmount}`;
        }
        fetchAdminStatements(parseInt(accountId), searchParams, accessToken);
      } else {
        fetchStatements(parseInt(accountId), accessToken);
      }
    }
  }, [accountId, isAuthenticated, isAdmin, accessToken, searchParams]);

  const navigate = useNavigate();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    const url = `/accounts/${data.get("accountNumber")}`;

    navigate(
      isAdmin
        ? `${url}?startDate=${data.get("startDate")}&endDate=${data.get(
            "endDate"
          )}&minAmount=${data.get("minAmount")}&maxAmount=${data.get(
            "maxAmount"
          )}`
        : url
    );
  };
  return (
    <>
      <Header />
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmitForm}
            noValidate
            sx={{ mt: 1 }}
          >
            <AccountNumbers />
            {state.user?.roles.includes("Admin") && (
              <>
                <Stack direction="row">
                  <StatementDatePicker label="Start Date" name="startDate" />
                  <StatementDatePicker label="End Date" name="endDate" />
                </Stack>
                <StatementAmountRange />
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              GO
            </Button>
          </Box>
          {statements && <StatementsTable statements={statements} />}
        </Box>
      </Container>
    </>
  );
};

export default Home;

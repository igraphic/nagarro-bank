import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IStatement } from "../../types/statement";

const StatementsTable: React.FC<{ statements: IStatement[] }> = ({
  statements,
}) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="statements table">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {statements.map((statement) => (
          <TableRow
            key={statement.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{statement.id}</TableCell>
            <TableCell>{statement.dateField}</TableCell>
            <TableCell>{statement.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default StatementsTable;

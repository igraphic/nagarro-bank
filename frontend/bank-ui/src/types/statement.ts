export interface IStatement {
  id: number;
  dateField: Date;
  amount: number;
}

export interface IAccount {
  id: number;
  accountNumber: string;
  accountType: string;
}

export enum EAccountType {
  "Saving",
  "Checking",
}

export interface IAccounts {
  [key: string]: IAccount[];
}

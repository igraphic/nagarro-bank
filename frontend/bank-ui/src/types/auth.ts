export interface IAuthContext {
  state: IAuthContextState;
  dispatch?: React.Dispatch<IAuthReducerAction>;
}

export interface IAuthContextState {
  isAuthenticated: boolean;
  user?: IUser | null;
  accessToken?: string | null;
}

export interface IAuthReducerAction {
  type: EAuthReducerActionTypes;
  payload?: IAuthContextState;
}

export enum EAuthReducerActionTypes {
  LOGIN,
  LOGOUT,
  REFRESH,
}

export interface IUser {
  roles: string[];
  username: string;
}

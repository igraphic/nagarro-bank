import React from "react";
import {
  EAuthReducerActionTypes,
  IAuthContext,
  IAuthContextState,
  IAuthReducerAction,
} from "../types/auth";

const initialState: IAuthContextState = {
  isAuthenticated: false,
};

export const AuthContext = React.createContext<IAuthContext>({
  state: initialState,
});

const authReducer = (
  state: IAuthContextState,
  action: IAuthReducerAction
): IAuthContextState => {
  const { type, payload } = action;

  console.log('payload', payload);
  switch (type) {
    
    case EAuthReducerActionTypes.LOGIN:
      localStorage.setItem("user", JSON.stringify(payload?.user));
      localStorage.setItem("token", payload?.accessToken as string);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload?.user,
        accessToken: action.payload?.accessToken,
      };
    case EAuthReducerActionTypes.REFRESH:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload?.user,
        accessToken: action.payload?.accessToken,
      };
    case EAuthReducerActionTypes.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
      };
    default:
      return state;
  }
};

const AuthContextWrapper: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextWrapper;

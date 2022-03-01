import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { EAuthReducerActionTypes } from "../types/auth";

export const useAuthentication = () => {
  const { state, dispatch } = useContext(AuthContext);
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");
  useEffect(() => {
    if (!state.isAuthenticated && savedUser && savedToken && dispatch) {
      dispatch({
        type: EAuthReducerActionTypes.REFRESH,
        payload: {
          user: JSON.parse(savedUser),
          accessToken: savedToken,
          isAuthenticated: true,
        },
      });
    }
  }, [state, dispatch, savedUser, savedToken]);
};

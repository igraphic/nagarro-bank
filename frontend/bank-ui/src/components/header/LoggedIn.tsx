import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { IUser, EAuthReducerActionTypes } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const LoggedIn: React.FC<{ user?: IUser | null }> = ({ user }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch &&
      dispatch({
        type: EAuthReducerActionTypes.LOGOUT,
      });
    navigate("/login");
  };
  return (
    <Box>
      <IconButton aria-label="delete" size="large">
        <AccountCircleIcon />
      </IconButton>
      <Button
        onClick={handleLogout}
        sx={{ my: 2, color: "white" }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default LoggedIn;

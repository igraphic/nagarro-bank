import AuthContext from "./context/AuthContext";
import AppRoutes from "./components/AppRoutes";
export default function App() {
  return (
    <AuthContext>
      <AppRoutes />
    </AuthContext>
  );
}

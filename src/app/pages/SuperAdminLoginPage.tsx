import { useNavigate } from "react-router";
import { SuperAdminLoginPage as SuperAdminLoginComponent } from "../components/SuperAdminLoginPage";

export function SuperAdminLoginPage() {
  const navigate = useNavigate();

  return (
    <SuperAdminLoginComponent
      onNavigateToRegister={() => navigate("/super-admin/register")}
      onNavigateToCustomerLogin={() => navigate("/signin")}
    />
  );
}
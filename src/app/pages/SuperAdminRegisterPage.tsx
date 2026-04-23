import { useNavigate } from "react-router";
import { SuperAdminRegisterPage as SuperAdminRegisterComponent } from "../components/SuperAdminRegisterPage";

export function SuperAdminRegisterPage() {
  const navigate = useNavigate();

  return (
    <SuperAdminRegisterComponent
      onNavigateToLogin={() => navigate("/super-admin/login")}
      onNavigateToCustomerRegister={() => navigate("/register")}
    />
  );
}
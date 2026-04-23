import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { SignInPage } from "./pages/SignInPage";
import { RegisterPage } from "./pages/RegisterPage";
import { PricingPage } from "./pages/PricingPage";
import { BillingPage } from "./pages/BillingPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardOverview } from "./pages/DashboardOverview";
import { Scope1Page } from "./pages/Scope1Page";
import { Scope2Page } from "./pages/Scope2Page";
import { Scope3Page } from "./pages/Scope3Page";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import { HelpSupportPage } from "./pages/HelpSupportPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { AIGHGReportPageWrapper } from "./pages/AIGHGReportPage";
import { AIESGReportPageWrapper } from "./pages/AIESGReportPage";
import { ESGPerformancePage } from "./pages/ESGPerformancePage";
import { AuditReportsPage } from "./pages/AuditReportsPage";
import { SuperAdminLoginPage } from "./pages/SuperAdminLoginPage";
import { SuperAdminRegisterPage } from "./pages/SuperAdminRegisterPage";
import { SuperAdminDashboardPage } from "./pages/SuperAdminDashboardPage";
import { BranchManagementPage } from "./pages/BranchManagementPage";
import { BranchDetailsPage } from "./pages/BranchDetailsPage";
import { BranchUserLoginPage } from "./pages/BranchUserLoginPage";
import { BranchUserDashboardLayout } from "./layouts/BranchUserDashboardLayout";
import { BranchUserDashboardOverview } from "./pages/BranchUserDashboardOverview";
import { BranchUserScope1Page } from "./pages/BranchUserScope1Page";
import { BranchUserScope2Page } from "./pages/BranchUserScope2Page";
import { BranchUserScope3Page } from "./pages/BranchUserScope3Page";
import { BranchUserProfilePage } from "./pages/BranchUserProfilePage";
import { BranchUserSettingsPage } from "./pages/BranchUserSettingsPage";
import { BranchUserReportsPage } from "./pages/BranchUserReportsPage";
import { BranchUserHelpPage } from "./pages/BranchUserHelpPage";
import { BranchUserDocumentationPage } from "./pages/BranchUserDocumentationPage";
import { BranchUserContactAdminPage } from "./pages/BranchUserContactAdminPage";
import { BranchUserPrivacyPage } from "./pages/BranchUserPrivacyPage";
import { BranchUserNotificationsPage } from "./pages/BranchUserNotificationsPage";
import { SecurityPage } from "./pages/SecurityPage";
import { DocumentationPage } from "./pages/DocumentationPage";
import { APIStatusPage } from "./pages/APIStatusPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ServicesPage } from "./pages/ServicesPage";
import { BlogsPage } from "./pages/BlogsPage";
import { BlogDetailsPage } from "./pages/BlogDetailsPage";

// Router Configuration
export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/services",
    Component: ServicesPage,
  },
  {
    path: "/blogs",
    Component: BlogsPage,
  },
  {
    path: "/blogs/:id",
    Component: BlogDetailsPage,
  },
  {
    path: "/signin",
    Component: SignInPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/pricing",
    Component: PricingPage,
  },
  {
    path: "/billing",
    Component: BillingPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardOverview,
      },
      {
        path: "scope1",
        Component: Scope1Page,
      },
      {
        path: "scope2",
        Component: Scope2Page,
      },
      {
        path: "scope3",
        Component: Scope3Page,
      },
      {
        path: "profile",
        Component: ProfilePage,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
      {
        path: "help-support",
        Component: HelpSupportPage,
      },
      {
        path: "notifications",
        Component: NotificationsPage,
      },
      {
        path: "ai-ghg-report",
        Component: AIGHGReportPageWrapper,
      },
      {
        path: "ai-esg-report",
        Component: AIESGReportPageWrapper,
      },
      {
        path: "esg-performance",
        Component: ESGPerformancePage,
      },
      {
        path: "audit-reports",
        Component: AuditReportsPage,
      },
      {
        path: "branches",
        Component: BranchManagementPage,
      },
      {
        path: "branches/:branchId",
        Component: BranchDetailsPage,
      },
      {
        path: "security",
        Component: SecurityPage,
      },
      {
        path: "documentation",
        Component: DocumentationPage,
      },
      {
        path: "api-status",
        Component: APIStatusPage,
      },
      {
        path: "privacy",
        Component: PrivacyPage,
      },
    ],
  },
  {
    path: "/super-admin/login",
    Component: SuperAdminLoginPage,
  },
  {
    path: "/super-admin/register",
    Component: SuperAdminRegisterPage,
  },
  {
    path: "/super-admin/dashboard",
    Component: SuperAdminDashboardPage,
  },
  {
    path: "/branch-user/login",
    Component: BranchUserLoginPage,
  },
  {
    path: "/branch-user",
    Component: BranchUserDashboardLayout,
    children: [
      {
        path: "dashboard",
        Component: BranchUserDashboardOverview,
      },
      {
        path: "scope1",
        Component: BranchUserScope1Page,
      },
      {
        path: "scope2",
        Component: BranchUserScope2Page,
      },
      {
        path: "scope3",
        Component: BranchUserScope3Page,
      },
      {
        path: "profile",
        Component: BranchUserProfilePage,
      },
      {
        path: "settings",
        Component: BranchUserSettingsPage,
      },
      {
        path: "reports",
        Component: BranchUserReportsPage,
      },
      {
        path: "help",
        Component: BranchUserHelpPage,
      },
      {
        path: "documentation",
        Component: BranchUserDocumentationPage,
      },
      {
        path: "contact-admin",
        Component: BranchUserContactAdminPage,
      },
      {
        path: "privacy",
        Component: BranchUserPrivacyPage,
      },
      {
        path: "notifications",
        Component: BranchUserNotificationsPage,
      },
    ],
  },
]);
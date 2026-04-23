# Branch User Dashboard System

## Overview

The Branch User Dashboard is a complete, permission-based portal for branch-level employees to manage their branch's emissions data within the SustainAIM platform. This system provides granular access control, allowing branch users to view and/or edit emissions data based on their assigned permissions.

## System Architecture

### Three-Tier User System

1. **Super Admin** - System administrators with full platform access
2. **Customer Portal** - Organization-level customers managing all branches
3. **Branch User Portal** - Branch-level users with limited, permission-based access ✨ NEW

## Features

### 1. Authentication & Authorization
- **Separate Login Page** (`/branch-user/login`)
  - Dedicated authentication for branch users
  - Demo credentials: `user@branch.com` / `password123`
  - Stores user session in localStorage

### 2. Permission-Based Access Control
Branch users have granular permissions for each emissions scope:
- **View Access** - Can view emissions data
- **Edit Access** - Can add, edit, and delete emissions entries
- **No Access** - Scope is locked and inaccessible

Example permission structure:
```javascript
{
  scope1: { view: true, edit: true },  // Full access
  scope2: { view: true, edit: true },  // Full access
  scope3: { view: true, edit: false }  // View-only access
}
```

### 3. Dashboard Layout

#### Components:
- **BranchUserSidebar** - Navigation with permission indicators
- **BranchUserHeader** - User profile, notifications, and search
- **BranchUserDashboardLayout** - Main layout wrapper

#### Sidebar Features:
- Branch information banner
- Permission-based navigation (locked items shown with shield icon)
- Collapsible sections
- Mobile-responsive with overlay

### 4. Dashboard Pages

#### a) Dashboard Overview (`/branch-user/dashboard`)
- Branch-specific emissions summary
- Scope breakdown with permission indicators
- Quick actions (based on edit permissions)
- Recent activities table
- Permission overview card

#### b) Scope Pages (`/branch-user/scope1`, `/scope2`, `/scope3`)
- **Permission Checks**:
  - No access → Shows locked screen
  - View-only → Can see data, actions disabled
  - Edit access → Full CRUD operations

- **Features**:
  - Comprehensive data table with 11 columns:
    - SR. NO., Year, Month, Category
    - Input Date, Invoice/Bill, Activity Data
    - Emission Factor, Emission (tCO2e)
    - Status, Actions
  - Search and filter functionality
  - Working pagination
  - Branch-specific data filtering
  - Stats cards (Total Emissions, Total Entries, etc.)

#### c) Reports Page (`/branch-user/reports`)
- Branch-specific emissions reports
- Filter by period, type, and scope
- Download reports in various formats
- Report generation requests
- Quick analytics shortcuts

#### d) Profile Page (`/branch-user/profile`)
- Editable personal information
- Branch assignment display
- Permission overview
- Account activity stats
- Profile photo upload

#### e) Settings Page (`/branch-user/settings`)
- Notification preferences (Email, Push, Alerts)
- Appearance settings (Dark mode, Language, Timezone)
- Security options (Password, 2FA)
- Data management (Export, Clear cache)

### 5. UI/UX Features

#### Design System:
- Emerald green color scheme (matching existing theme)
- Modern, card-based layouts
- Smooth animations (Framer Motion)
- Responsive design (mobile-first)
- Permission indicators throughout

#### User Feedback:
- Toast notifications (Sonner)
- Loading states
- Permission-based disabled states
- Helpful tooltips for locked features

## File Structure

```
src/app/
├── pages/
│   ├── BranchUserLoginPage.tsx           # Branch user authentication
│   ├── BranchUserDashboardOverview.tsx   # Main dashboard
│   ├── BranchUserScope1Page.tsx          # Scope 1 emissions
│   ├── BranchUserScope2Page.tsx          # Scope 2 emissions
│   ├── BranchUserScope3Page.tsx          # Scope 3 emissions
│   ├── BranchUserProfilePage.tsx         # User profile
│   ├── BranchUserSettingsPage.tsx        # Settings & preferences
│   └── BranchUserReportsPage.tsx         # Reports & analytics
├── layouts/
│   └── BranchUserDashboardLayout.tsx     # Dashboard layout wrapper
├── components/
│   ├── BranchUserSidebar.tsx             # Navigation sidebar
│   ├── BranchUserHeader.tsx              # Header with user menu
│   └── BranchScopePage.tsx               # Reusable scope page component
└── routes.tsx                             # Route configuration
```

## Routes

```javascript
/branch-user/login         → Login page
/branch-user/dashboard     → Dashboard overview
/branch-user/scope1        → Scope 1 emissions (permission-based)
/branch-user/scope2        → Scope 2 emissions (permission-based)
/branch-user/scope3        → Scope 3 emissions (permission-based)
/branch-user/profile       → User profile
/branch-user/settings      → Settings
/branch-user/reports       → Reports
```

## Usage Guide

### For Branch Users:

1. **Login**
   - Navigate to `/branch-user/login`
   - Enter credentials (demo: user@branch.com / password123)
   - System redirects to dashboard

2. **Navigate Dashboard**
   - View branch-specific emissions summary
   - Check permission indicators on scope cards
   - Access quick actions (if edit permission available)

3. **Manage Emissions Data**
   - Click on scope pages from sidebar
   - If locked, contact admin for access
   - If view-only, see data but cannot edit
   - If edit access, use Add/Edit/Delete actions

4. **Generate Reports**
   - Go to Reports page
   - Filter by period and scope
   - Download existing reports
   - Request new report generation

5. **Update Profile**
   - Access profile page
   - Edit personal information
   - View assigned permissions
   - Upload profile photo

### For Administrators:

When adding branch users from the Customer Portal:
1. Navigate to Branch Management
2. Select a branch
3. Go to "Branch Users" tab
4. Click "Add User"
5. Fill in user details
6. **Set permissions** for each scope:
   - Toggle "View" access
   - Toggle "Edit" access
7. Save user

The user credentials are automatically generated and can be used to log in to the Branch User Portal.

## Permission Logic

### Access Levels:
```
No Access  → Cannot view scope at all (shows lock screen)
View Only  → Can see data, all edit actions disabled
Edit       → Full access (view + add + edit + delete)
```

### Implementation:
```javascript
const permissions = branchUserData.permissions || {};
const canView = permissions.scope1?.view || false;
const canEdit = permissions.scope1?.edit || false;

// In UI:
if (!canView) return <LockedScreen />;
if (!canEdit) return <ViewOnlyInterface />;
return <FullAccessInterface />;
```

## Data Flow

1. **Authentication**
   - User logs in at `/branch-user/login`
   - Credentials validated (currently demo mode)
   - User data + permissions stored in localStorage

2. **Authorization**
   - Each page component reads permissions from localStorage
   - Components render based on permission level
   - Actions are conditionally enabled/disabled

3. **Data Management**
   - Branch user sees only their branch data
   - Filtered by branchId from session
   - CRUD operations respect edit permissions

## Integration Points

### With Customer Portal:
- Branch users created from Customer Portal → Branch Management → Branch Users
- Permissions set by customer organization
- Branch user data synced across both portals

### With Super Admin:
- Super Admin can view all branch users
- Can modify permissions across all branches
- Can disable/enable branch user accounts

## Security Considerations

1. **Authentication**
   - Currently demo mode with localStorage
   - Production: Implement JWT tokens
   - Production: Add session timeout

2. **Authorization**
   - Permission checks on every page
   - Actions disabled in UI based on permissions
   - Production: Add server-side permission validation

3. **Data Isolation**
   - Branch users see only their branch data
   - Filtered by branchId from session
   - Production: Implement database-level filtering

## Future Enhancements

1. **Real Authentication**
   - JWT token-based authentication
   - Refresh token mechanism
   - Password reset flow
   - Email verification

2. **Advanced Permissions**
   - Category-level permissions
   - Time-based access (e.g., monthly windows)
   - Approval workflows
   - Audit logging

3. **Enhanced Features**
   - Real-time notifications
   - Collaborative editing
   - Comments and discussions
   - File attachments

4. **Analytics**
   - Branch performance comparisons
   - Goal tracking and progress
   - Predictive analytics
   - Custom dashboards

## Demo Credentials

### Branch User Login:
- **Email**: user@branch.com
- **Password**: password123
- **Branch**: Mumbai Headquarters
- **Permissions**:
  - Scope 1: View + Edit
  - Scope 2: View + Edit
  - Scope 3: View Only

## Testing Checklist

- [x] Login functionality
- [x] Dashboard overview displays correctly
- [x] Permission-based navigation works
- [x] Scope pages show correct access levels
- [x] View-only mode disables edit actions
- [x] No access mode shows lock screen
- [x] Profile editing works
- [x] Settings save correctly
- [x] Reports page displays reports
- [x] Logout functionality
- [x] Mobile responsive design
- [x] Notifications display
- [x] Search functionality
- [x] Pagination works correctly

## Support

For issues or questions:
- Contact branch administrator for permission changes
- Contact super admin for account issues
- Refer to help documentation in settings

---

**Version**: 1.0.0
**Last Updated**: April 2026
**Created For**: SustainAIM Platform

# 🎯 HOW TO ACCESS SCOPE 1 EMISSIONS DATA - BRANCH USER DASHBOARD

## ✅ **SCOPE 1 IS NOW FULLY ACCESSIBLE!**

Your Branch User Dashboard has **complete Scope 1 emissions tracking** with 6 emission records ready to view!

---

## 📍 **STEP-BY-STEP ACCESS GUIDE**

### **Step 1: Login to Branch User Portal**
1. Navigate to: `/branch-user/login`
2. Enter any email and password
3. Click "Login"
4. You'll be automatically logged in with these permissions:
   - ✅ **Scope 1**: View + Edit Access
   - ✅ **Scope 2**: View + Edit Access  
   - ✅ **Scope 3**: View Only Access

---

### **Step 2: Navigate to Scope 1** (3 ways to access)

#### **METHOD A: From Sidebar** ⭐ RECOMMENDED
1. Look at the left sidebar
2. Find the **"EMISSIONS DATA"** section
3. Click on **"Scope 1"** (with green dot indicator)
4. ✅ Scope 1 page loads instantly!

#### **METHOD B: From Dashboard Overview**
1. After login, you're on the dashboard
2. Scroll to **"Emissions by Scope"** section
3. Click the **"Scope 1 - Direct Emissions"** card (emerald green)
4. ✅ Navigates directly to Scope 1 data!

#### **METHOD C: Direct URL**
- Simply navigate to: `/branch-user/scope1`

---

## 📊 **WHAT YOU'LL SEE IN SCOPE 1**

### **🟢 Success Banner** (Top of page)
```
✓ Emissions Data Loaded Successfully!
You are viewing Scope 1 - Direct Emissions with 6 emission records.
You can add, edit, and manage entries.
```

### **📈 Statistics Cards**
- **Total Emissions**: 65.5 tCO2e
- **Total Entries**: 6 Records
- **This Month**: 21.3 tCO2e (March 2026)
- **Avg per Entry**: 10.9 tCO2e

### **📋 Emission Records Available**

| # | Category | Date | Invoice | Activity | Emissions | Status |
|---|----------|------|---------|----------|-----------|--------|
| 1 | Fuel Combustion | 2026-03-15 | INV-2026-001 | 1200 kWh | 12.50 tCO2e | ✅ Approved |
| 2 | Company Vehicles | 2026-03-10 | INV-2026-002 | 850 L | 8.75 tCO2e | ⏳ Pending |
| 3 | Process Emissions | 2026-02-28 | INV-2026-003 | 2500 kg | 15.30 tCO2e | ✅ Approved |
| 4 | Fuel Combustion | 2026-02-20 | INV-2026-004 | 1800 kWh | 18.90 tCO2e | ✅ Approved |
| 5 | Fugitive Emissions | 2026-01-15 | INV-2026-005 | 950 kWh | 9.85 tCO2e | ✅ Approved |
| 6 | Mobile Combustion | 2026-01-08 | INV-2026-006 | 600 L | 6.20 tCO2e | ✅ Approved |

---

## 🎨 **KEY FEATURES**

### ✅ **Available Actions** (with Edit Access)
- ➕ **Add Entry** - Create new emission records
- 📥 **Export** - Download data as CSV/Excel
- 📤 **Import** - Bulk upload emission data
- 🔍 **Search** - Find records by category or invoice
- 🗓️ **Filter** - Filter by date range
- ✏️ **Edit** - Modify existing entries
- 🗑️ **Delete** - Remove records
- 👁️ **View** - See detailed information

### 📱 **Responsive Design**
- **Desktop**: Full data table with all columns
- **Mobile**: Card-based layout with essential info
- **Tablet**: Adaptive layout for optimal viewing

### 🎯 **Visual Indicators**
- **Green Badge**: "✓ 6 Records Available"
- **Access Badge**: "Edit Access" (for full permissions)
- **Status Icons**: ✅ Approved / ⏳ Pending
- **Branch Info**: Shows "Mumbai Headquarters"

---

## 🔐 **PERMISSIONS**

Your current Branch User has these permissions:

```javascript
{
  scope1: { view: ✅, edit: ✅ },  // FULL ACCESS
  scope2: { view: ✅, edit: ✅ },  // FULL ACCESS
  scope3: { view: ✅, edit: ❌ }   // VIEW ONLY
}
```

---

## 🚀 **QUICK START COMMANDS**

### To Access Scope 1 Right Now:
1. Open your browser
2. Go to: `http://localhost:5173/branch-user/login`
3. Enter any credentials (e.g., email: `user@branch.com`, password: `123`)
4. Click "Login"
5. In the sidebar, click **"Scope 1"** under "EMISSIONS DATA"
6. **DONE!** 🎉

---

## 📸 **WHAT THE SCOPE 1 PAGE LOOKS LIKE**

```
┌─────────────────────────────────────────────────────────┐
│ ✓ Emissions Data Loaded Successfully!                   │
│ You are viewing Scope 1 with 6 emission records         │
│                                          [ACTIVE] badge  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ [Scope 1] [Edit Access] [✓ 6 Records Available]         │
│                                                          │
│ Scope 1 - Direct Emissions                              │
│ Direct GHG emissions from sources owned or controlled   │
│ by your branch                                           │
│                                                          │
│ 🛡️ Branch: Mumbai Headquarters                         │
│                                                          │
│           [➕ Add Entry] [📥 Export] [📤 Import]         │
└─────────────────────────────────────────────────────────┘

┌──────────┬──────────┬──────────┬──────────┐
│  Total   │  Total   │   This   │   Avg    │
│Emissions │ Entries  │  Month   │per Entry │
│  65.5    │    6     │   21.3   │   10.9   │
│  tCO2e   │ Records  │  tCO2e   │  tCO2e   │
└──────────┴──────────┴──────────┴──────────┘

[Search bar] [Filters] [Date Range]

┌─────────────────────────────────────────────────────────┐
│ SR.│Year│Month │Category        │Date      │Invoice   │
├────┼────┼──────┼────────────────┼──────────┼──────────┤
│ 1  │2026│March │Fuel Combustion │2026-03-15│INV-001   │
│ 2  │2026│March │Company Vehicles│2026-03-10│INV-002   │
│ 3  │2026│Feb   │Process Emission│2026-02-28│INV-003   │
│ ... (and 3 more records)                                │
└─────────────────────────────────────────────────────────┘
```

---

## ✨ **SUCCESS CONFIRMATION**

You will know Scope 1 is properly loaded when you see:

1. ✅ **Green success banner** at the top
2. ✅ **"6 Records Available"** badge
3. ✅ **Statistics showing 65.5 tCO2e** total emissions
4. ✅ **Data table with 6 emission entries**
5. ✅ **Edit Access badge** (if you have permissions)

---

## 🎯 **SCOPE 1 CATEGORIES INCLUDED**

The 6 emission records cover these Scope 1 categories:
1. **Fuel Combustion** - Stationary fuel burning
2. **Company Vehicles** - Mobile combustion
3. **Process Emissions** - Industrial processes
4. **Fugitive Emissions** - Leakage from equipment
5. **Mobile Combustion** - Fleet operations

All aligned with **GHG Protocol Scope 1** standards!

---

## 📞 **SUPPORT**

If you need to:
- Request access to other scopes
- Upgrade from view-only to edit permissions
- Get help with data entry

Contact your **Branch Administrator** through the dashboard.

---

**🎉 CONGRATULATIONS! You now have full access to Scope 1 Emissions Data!**

Last Updated: April 6, 2026
Branch: Mumbai Headquarters
Access Level: Full Edit Access ✅

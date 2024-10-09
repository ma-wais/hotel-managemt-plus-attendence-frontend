import { BrowserRouter, Route, Routes } from "react-router-dom";
import BranchDashboard from "./pages/BranchDashboard.jsx";
import CreateBranch from "./pages/CreateBranch.jsx";
import BranchPage from "./components/BranchPage.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import AddSection from "./pages/AddSection.jsx";
import AddShift from "./pages/AddShift.jsx";
import BranchLogin from "./components/BranchLogin.jsx";
import EditBranch from "./pages/EditBranch.jsx";
import EmployeeForm from "./pages/EmployeeForm.jsx";
import UserLogin from "./pages/Login.jsx";
import AdminBranches from "./pages/AdminBranches.jsx";
import TransferEmployee from "./pages/TransferEmployee.jsx";
import EditEmployee from "./pages/EditEmployee.jsx";
import ManageEmployeesPage from "./pages/ManageEmployee.jsx";
import Header, { SideBar } from "./components/Header.jsx";
import { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeList from "./pages/EmployeeList.jsx";
import AttendanceList from "./pages/Attendence.jsx";
import DeleteEmployee from "./pages/DeleteEmployee.jsx";
import EditBranches from "./pages/EditBranches.jsx";
import ShiftList from "./pages/ShiftList.jsx";
import DeleteShift from "./pages/DeleteShift.jsx";
import SectionList from "./pages/SectionList.jsx";
import DeleteSection from "./pages/DeleteSection.jsx";
import DeleteBranch from "./pages/DeleteBranch.jsx";

// export const server = "http://localhost:5000/api";
export const server = "https://hotel-memt-plus-att-api.onrender.com/api"

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(
    window.innerWidth > 1000
  );
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <BrowserRouter>
      <Header
        toggleSidebar={toggleSidebar}
        token={null}
        setToken={null}
        setUser={null}
      />
      <div
        className={`main-container ${
          sidebarVisible ? "sidebar-visible" : "sidebar-hidden"
        }`}
      >
        <SideBar
          className="sideBar"
          setUser={null}
          sidebarVisible={sidebarVisible}
        />
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/dashboard" element={<BranchDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/branches" element={<AdminBranches />} />

          <Route path="/admin/employees" element={<EmployeeList />} />
          <Route path="/admin/employees-present" element={<AttendanceList />} />
          <Route
            path="/admin/employees-absent"
            element={<AttendanceList defaultTab="absent" />}
          />
          <Route path="/admin/employees/delete" element={<DeleteEmployee />} />

          <Route path="/login" element={<BranchLogin />} />
          <Route path="/admin/create-branch" element={<CreateBranch />} />
          <Route path="/admin/branches/edit" element={<EditBranches />} />
          <Route path="/admin/branch/delete" element={<DeleteBranch />} />
          <Route path="/branch/:branchId" element={<BranchPage />} />
          <Route path="/branches/:branchId/edit" element={<EditBranch />} />

          <Route path="/branches/:branchId/add-shift" element={<AddShift />} />
          <Route path="/admin/shifts" element={<ShiftList />} />
          <Route path="/admin/shift/delete" element={<DeleteShift />} />

          <Route path="/admin/sections" element={<SectionList />} />
          <Route path="/admin/section/delete" element={<DeleteSection />} />

          <Route path="/admin/dashboard/employees" element={<EmployeeForm />} />
          <Route
            path="/employees/:employeeId/transfer"
            element={<TransferEmployee />}
          />
          <Route
            path="/employees/:employeeId/edit"
            element={<EditEmployee />}
          />
          <Route
            path="/branches/:branchId/add-section"
            element={<AddSection />}
          />
          <Route
            path="/branches/:branchId/sections/:sectionId/shifts/:shiftId/add-employee"
            element={<AddEmployee />}
          />
          <Route
            path="/branches/:branchId/sections/:sectionId/shifts/:shiftId/manage-employees"
            element={<ManageEmployeesPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

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
import AdminDashboard from "./pages/AdminDashboard.jsx";
import TransferEmployee from "./pages/TransferEmployee.jsx";
import EditEmployee from "./pages/EditEmployee.jsx";
import ManageEmployeesPage from "./pages/ManageEmployee.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";

export const server = "http://localhost:5000/api";
// export const server = "https://hotel-memt-plus-att-api.onrender.com/api"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/dashboard" element={<BranchDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-branch" element={<CreateBranch />} />
        <Route path="/login" element={<BranchLogin />} />
        <Route path="/branch/:branchId" element={<BranchPage />} />
        <Route path="/dashboard/employees" element={<EmployeeForm />} />
        <Route path="/employees/:employeeId/transfer" element={<TransferEmployee />} />
        <Route path="/employees/:employeeId/edit" element={<EditEmployee />} />

        <Route
          path="/branches/:branchId/sections/:sectionId/shifts/:shiftId/add-employee"
          element={<AddEmployee />}
        />
        <Route
          path="/branches/:branchId/sections/:sectionId/shifts/:shiftId/manage-employees"
          element={<ManageEmployeesPage />}
        />
        <Route
          path="/branches/:branchId/add-section"
          element={<AddSection />}
        />
        <Route path="/branches/:branchId/add-shift" element={<AddShift />} />
        <Route path="/branches/:branchId/edit" element={<EditBranch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

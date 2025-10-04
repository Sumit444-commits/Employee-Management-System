import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Pages from "./pages/index";
import PrivateRoute from "./utils/PrivateRoute";
import RoleBasedRoute from "./utils/RoleBasedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSummary from "./components/Dashboard/AdminSummary";
import DepartmentList from "./components/Departments/DepartmentList";
import AddDepartment from "./components/Departments/AddDepartment,";
import EditDepartment from "./components/Departments/EditDepartment";
import List from "./components/Employees/List";
import Add from "./components/Employees/Add";
import View from "./components/Employees/View";
import Edit from "./components/Employees/Edit";
import AddSalary from "./components/Salary/AddSalary";
import ViewSalary from "./components/Salary/ViewSalary";
import Summary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/Leaves/LeavesList";
import AddLeave from "./components/Leaves/AddLeave";
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/Leaves/Table";
import LeaveDetail from "./components/Leaves/LeaveDetail";
import Attendance from "./components/Attandance/Attendance";
import AttendanceReport from "./components/Attandance/AttendanceReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/admin-dashboard"} />}></Route>
        <Route path="/login" element={<Pages.Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <RoleBasedRoute requiredRole={["admin"]}>
                <Pages.AdminDashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<AdminSummary />}></Route>

          {/* Departments Routes */}
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          ></Route>

          {/* Employee Routes */}
          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
          <Route
            path="/admin-dashboard/employees/:id"
            element={<View />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/edit/:id"
            element={<Edit />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/salary/:id"
            element={<ViewSalary />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/leaves/:id"
            element={<LeaveList />}
          ></Route>

          {/* Salary Routes */}
          <Route
            path="/admin-dashboard/salary/add"
            element={<AddSalary />}
          ></Route>

          {/* Leaves Routes */}
          <Route
            path="/admin-dashboard/leaves"
            element={<Table />}
          ></Route>
          <Route
            path="/admin-dashboard/leave/:id"
            element={<LeaveDetail />}
          ></Route>
          <Route
            path="/admin-dashboard/attendance"
            element={<Attendance />}
          ></Route>
          <Route
            path="/admin-dashboard/attendance-report"
            element={<AttendanceReport />}
          ></Route>

          <Route
            path="/admin-dashboard/setting"
            element={<Setting />}
          ></Route>


        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoute>
              <RoleBasedRoute requiredRole={["admin", "employee"]}>
                <Pages.EmployeeDashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<Summary />}></Route>
          <Route path="/employee-dashboard/profile/:id" element={<View/>} />
          <Route path="/employee-dashboard/leaves/:id" element={<LeaveList/>} />
          <Route path="/employee-dashboard/add-leave" element={<AddLeave/>} />
          <Route path="/employee-dashboard/salary/:id" element={<ViewSalary/>} />
          <Route path="/employee-dashboard/setting" element={<Setting/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

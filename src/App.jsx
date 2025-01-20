import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

import { CustomSnackbar } from "./component/CustomSnackbar";
import AttendantRoutes from "./routes/AttendantRoutes";

function App() {
  return (
    <>
      <div>
        <CustomSnackbar />
      </div>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/attendant/*" element={<AttendantRoutes />} />

        <Route
          path="/admin/*"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { useEffect } from "react";
import { CustomSnackbar } from "./component/CustomSnackbar";
import AttendantRoutes from "./routes/AttendantRoutes";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
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

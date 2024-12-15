/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import React, { useState, useEffect } from "react";
import { CustomSnackbar } from "./component/CustomSnackbar";
import AttendantRoutes from "./routes/AttendantRoutes";

function App() {
  return (
    <>
      <div>
        {/* Komponen lainnya */}
        <CustomSnackbar /> {/* Pastikan ini ada di layout utama */}
      </div>
      <Routes>
        {/* User Routes */}
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/attendant/*" element={<AttendantRoutes />} />

        {/* Admin Routes */}
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

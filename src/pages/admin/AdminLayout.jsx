/* eslint-disable react/prop-types */
// src/layout/AdminLayout.jsx
const AdminLayout = ({ children }) => {
  return (
    <div>
      {/* Tidak ada NavBar dan Footer di sini */}
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;

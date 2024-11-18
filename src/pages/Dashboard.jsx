import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="mt-52">
      <h1>Welcome, {user?.name}</h1> {/* Menampilkan nama pengguna */}
    </div>
  );
};

export default Dashboard;

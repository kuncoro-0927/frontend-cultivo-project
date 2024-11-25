import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <section className="bg-gray-50 mt-52">
        <div className="mt-52">
          <h1>Welcome, {user?.name}</h1>
          <p>haii</p>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

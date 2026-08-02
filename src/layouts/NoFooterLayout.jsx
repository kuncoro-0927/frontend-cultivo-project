import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";

const NoFooterLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default NoFooterLayout;

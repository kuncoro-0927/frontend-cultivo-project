import { Link } from "react-router-dom";

const AuthLogo = () => (
  <Link to="/" className="lg:ml-0">
    <img
      src="/images/logo2.svg"
      className="m-5 md:m-0 w-24 md:w-28"
      alt="Logo"
    />
  </Link>
);

export default AuthLogo;

import { Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AuthPromoBanner from "./components/AuthPromoBanner";

const Login = () => {
  return (
    <section className="lg:mx-10 2xl:mx-32 lg:my-10 rounded-2xl lg:p-0">
      <Link to="/" className="lg:ml-0">
        <img src="/images/logo2.svg" className="m-5 md:m-0 w-24 md:w-28" alt="Logo" />
      </Link>

      <div className="flex justify-center mt-16 2xl:mt-0 2xl:min-h-screen 2xl:items-center md:mt-0 lg:justify-center md:justify-start gap-20 items-center">
        <div>
          <h1 className="text-hitam text-center text-xl lg:text-2xl font-extrabold">
            Masuk dengan akun anda
          </h1>
          <p className="text-center mt-3 text-xs md:text-sm text-gray-500">
            Masuk untuk memulai perjalanan seru Anda
          </p>

          <div className="grid-1 grid mt-10 w-[260px] sm:w-[500px] md:w-[300px] lg:w-[350px]">
            <LoginForm />
          </div>
        </div>

        <AuthPromoBanner />
      </div>
    </section>
  );
};

export default Login;

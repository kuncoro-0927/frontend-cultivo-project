import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import StyledTextField from "../components/StyledTextField";
import GoogleLoginButton from "../components/GoogleLoginButton";
import AuthPromoPanel from "../components/AuthPromoPanel";
import AuthLogo from "../components/AuthLogo";
import { useGoogleLogin } from "../hooks/useGoogleLogin";

const RegisterFormSection = ({ registerForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleGoogleLogin = useGoogleLogin();

  return (
    <section className=" lg:mx-10 2xl:mx-32 lg:my-10 rounded-2xl lg:p-0">
      <AuthLogo />
      <div className="flex justify-center mt-14 2xl:mt-0 2xl:min-h-screen 2xl:items-center lg:justify-center  md:justify-start gap-20 items-center">
        <div className="">
          <h1 className="text-hitam text-center text-xl lg:text-2xl font-extrabold">
            {" "}
            Buat akun anda
          </h1>
          <p className="text-center mt-3 text-sm text-gray-500">
            Daftar untuk memulai perjalanan seru Anda
          </p>

          <GoogleLoginButton onClick={handleGoogleLogin} />

          <div className="mt-5 flex items-center justify-between">
            <div className="flex-grow border-b border-gray-300"></div>
            <div className="mx-4 text-xs">Atau</div>
            <div className="flex-grow border-b border-gray-300"></div>
          </div>
          <div className="grid-1 space-y-5 grid mt-10 w-[260px] sm:w-[500px] md:w-[300px] lg:w-[350px]">
            <StyledTextField
              label="Nama"
              name="firstName"
              value={registerForm.name}
              onChange={registerForm.handleNameChange}
              error={Boolean(registerForm.errorName)}
              helperText={registerForm.errorName}
            />

            <StyledTextField
              type="email"
              label="Email"
              name="email"
              value={registerForm.email}
              onChange={registerForm.handleEmailChange}
              error={Boolean(registerForm.errorEmail)}
              helperText={registerForm.errorEmail}
            />
            <StyledTextField
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              value={registerForm.password}
              onChange={registerForm.handlePasswordChange}
              error={Boolean(registerForm.errorPassword)}
              helperText={registerForm.errorPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <button
              onClick={registerForm.handleRegister}
              className="p-2 text-sm bg-hitam mt-10 hover:bg-hover text-white rounded-md"
              disabled={registerForm.loading}
            >
              {registerForm.loading ? (
                <CircularProgress size={17} color="inherit" />
              ) : (
                "Daftar"
              )}
            </button>
            <div className="mt-5 text-xs md:text-sm flex justify-center gap-1">
              Sudah punya akun?
              <Link to="/login" className="font-semibold">
                Masuk
              </Link>
            </div>
          </div>
        </div>

        <AuthPromoPanel />
      </div>
    </section>
  );
};

export default RegisterFormSection;

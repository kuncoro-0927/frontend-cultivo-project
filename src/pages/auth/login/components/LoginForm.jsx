import { Link } from "react-router-dom";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { useLogin } from "../hooks/useLogin";

const textFieldSx = {
  "& .MuiOutlinedInput-root": { color: "black !important" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "black !important" },
  "& .MuiInputLabel-root": { color: "black !important" },
};

const LoginForm = () => {
  const {
    email,
    password,
    loading,
    showPassword,
    errorEmail,
    errorPassword,
    setShowPassword,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleGoogleLogin,
  } = useLogin();

  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col space-y-5">
        <TextField
          fullWidth
          type="email"
          label="Email"
          variant="outlined"
          name="email"
          value={email}
          onChange={handleEmailChange}
          size="small"
          error={Boolean(errorEmail)}
          helperText={errorEmail}
          sx={textFieldSx}
        />
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          size="small"
          error={Boolean(errorPassword)}
          helperText={errorPassword}
          sx={textFieldSx}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className="flex items-center justify-between">
          <Link to="/forgot-password" className="hover:text-blue-500 text-sm">
            Lupa kata sandi?
          </Link>
        </div>
        <button
          type="submit"
          className="p-2 bg-hitam mt-10 hover:bg-hover text-white text-sm rounded-md"
          disabled={loading}
        >
          {loading ? <CircularProgress size={17} color="inherit" /> : "Masuk"}
        </button>
      </form>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex-grow border-b border-gray-300"></div>
        <div className="mx-4 text-xs">Atau</div>
        <div className="flex-grow border-b border-gray-300"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="bg-gray-200 bg-opacity-30 rounded-md p-2 mt-5 flex items-center justify-center gap-2"
      >
        <img className="w-[22px]" src="/images/google.svg" alt="" />
        <p className="text-sm"> Masuk dengan Google</p>
      </button>

      <div className="mt-5 text-xs md:text-sm flex justify-center gap-1">
        Belum punya akun?
        <Link to="/register" className="font-semibold">
          Daftar
        </Link>
      </div>
    </>
  );
};

export default LoginForm;

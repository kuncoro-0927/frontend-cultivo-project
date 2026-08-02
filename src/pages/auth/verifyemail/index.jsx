import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import EmailOTP from "./components/OTP";
import AuthPromoBanner from "../../../component/AuthPromoBanner";
import { useEmailVerify } from "./hooks/useEmailVerify";
import { maskEmail, formatTime } from "./utils/emailVerifyHelpers";

const EmailVerify = () => {
  const {
    otp,
    setOtp,
    timer,
    otpExpired,
    email,
    error,
    loadingVerify,
    handleVerify,
    handleResendOtp,
  } = useEmailVerify();

  return (
    <section className="lg:mx-10 2xl:mx-32 lg:my-10 rounded-2xl lg:p-0">
      <Link to="/" className="lg:ml-0">
        <img
          src="/images/logo2.svg"
          className="m-5 md:m-0 w-24 md:w-28"
          alt="Logo"
        />
      </Link>

      <div className="flex p-10 justify-center md:p-0 md:mt-0 mt-7 2xl:mt-0 2xl:min-h-screen 2xl:justify-center gap-20 items-center">
        <div>
          <h1 className="text-hitam text-center text-2xl lg:text-2xl font-semibold">
            Verifikasi kode OTP
          </h1>
          <div className="md:text-normal text-sm mt-5">
            Silakan masukkan kode yang kami kirim ke email Anda
            <p className="mr-1 text-blue-400">{maskEmail(email)}</p>
            Demi keamanan Anda, pastikan untuk tidak membagikan kode ini
            <br />
            kepada siapa pun. Jaga kerahasiaannya untuk melindungi akun Anda.
          </div>

          <div className="grid-1 grid mt-5">
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EmailOTP
                  separator={<span>-</span>}
                  value={otp}
                  onChange={setOtp}
                  length={6}
                />
              </div>

              <button
                className="p-2 w-full bg-hitam mt-10 hover:bg-hover text-white rounded-md"
                onClick={handleVerify}
                disabled={loadingVerify}
              >
                {loadingVerify ? (
                  <CircularProgress size={17} color="inherit" />
                ) : (
                  "Verifikasi"
                )}
              </button>
              {error && (
                <div className="text-red-500 mt-3 text-sm">{error}</div>
              )}
            </div>

            <div className="md:mt-3 mt-10 text-sm flex justify-center">
              Belum terima kode OTP?
              <Tooltip
                title={!otpExpired ? "Kirim ulang saat kode kadaluwarsa" : ""}
              >
                <span>
                  <button
                    onClick={handleResendOtp}
                    disabled={!otpExpired}
                    className={`ml-1 hover:underline ${
                      otpExpired
                        ? "text-blue-400"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Kirim ulang
                  </button>
                </span>
              </Tooltip>
            </div>

            <div className="mt-2 text-sm flex justify-center">
              <p>
                {otpExpired
                  ? "Kode OTP kadaluwarsa"
                  : `Kode OTP akan kadaluwarsa dalam: ${formatTime(timer)}`}
              </p>
            </div>
          </div>
        </div>

        <AuthPromoBanner />
      </div>
    </section>
  );
};

export default EmailVerify;

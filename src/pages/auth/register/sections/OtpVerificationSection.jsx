import { Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import OtpInput from "../components/OtpInput";
import AuthLogo from "../components/AuthLogo";
import AuthPromoPanel from "../components/AuthPromoPanel";
import { maskEmail } from "../utils/maskEmail";
import { formatTime } from "../utils/formatTime";

const OtpVerificationSection = ({ email, otpVerification }) => {
  return (
    <section className=" lg:mx-10 2xl:mx-32 lg:my-10 rounded-2xl lg:p-0">
      <AuthLogo />

      <div className="flex p-10 justify-center md:p-0 md:mt-0 mt-7 2xl:mt-0 2xl:min-h-screen 2xl:items-center lg:justify-center  md:justify-start gap-20 items-center">
        <div className="">
          <h1 className="text-hitam text-center text-2xl lg:text-2xl font-semibold">
            {" "}
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
            <div className="">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <OtpInput
                  separator={<span>-</span>}
                  value={otpVerification.otp}
                  onChange={otpVerification.setOtp}
                  length={6}
                />
              </div>

              <button
                className="p-2 w-full bg-hitam mt-10 hover:bg-hover text-white rounded-md"
                onClick={otpVerification.handleVerify}
                disabled={otpVerification.loadingVerify}
              >
                {otpVerification.loadingVerify ? (
                  <CircularProgress size={17} color="inherit" />
                ) : (
                  "Verifikasi"
                )}
              </button>
              {otpVerification.error && (
                <div className="text-red-500 mt-3 text-sm">
                  {otpVerification.error}
                </div>
              )}
            </div>
            <div className="md:mt-3 mt-10 text-sm flex justify-center">
              Belum terima kode OTP?
              <Tooltip
                title={
                  !otpVerification.otpExpired
                    ? "Kirim ulang saat kode kadaluwarsa"
                    : ""
                }
              >
                <span>
                  <button
                    onClick={otpVerification.handleResendOtp}
                    disabled={!otpVerification.otpExpired}
                    className={`ml-1 hover:underline ${
                      otpVerification.otpExpired
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
                {otpVerification.otpExpired
                  ? "Kode OTP kadaluwarsa"
                  : `Kode OTP akan kadaluwarsa dalam: ${formatTime(
                      otpVerification.timer
                    )}`}
              </p>
            </div>
          </div>
        </div>

        <AuthPromoPanel />
      </div>
    </section>
  );
};

export default OtpVerificationSection;

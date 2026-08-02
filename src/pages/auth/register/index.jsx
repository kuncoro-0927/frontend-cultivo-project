import { useState } from "react";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { useOtpVerification } from "./hooks/useOtpVerification";
import RegisterFormSection from "./sections/RegisterFormSection";
import OtpVerificationSection from "./sections/OtpVerificationSection";

const Register = () => {
  const [step, setStep] = useState(1);

  const registerForm = useRegisterForm({
    onRegistered: (token) => {
      otpVerification.setOtpToken(token);
      otpVerification.resetTimer();
      setStep(2);
    },
  });

  const otpVerification = useOtpVerification(registerForm.email);

  return (
    <div className="">
      {step === 1 ? (
        <RegisterFormSection registerForm={registerForm} />
      ) : (
        <OtpVerificationSection
          email={registerForm.email}
          otpVerification={otpVerification}
        />
      )}
    </div>
  );
};

export default Register;

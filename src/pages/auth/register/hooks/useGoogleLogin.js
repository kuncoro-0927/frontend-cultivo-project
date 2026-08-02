export const useGoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/cultivo/api/auth/google`;
  };

  return handleGoogleLogin;
};

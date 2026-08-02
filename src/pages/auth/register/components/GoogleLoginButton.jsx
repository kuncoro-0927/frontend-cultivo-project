const GoogleLoginButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-gray-200 w-full bg-opacity-30 rounded-md p-2 mt-5 flex items-center justify-center gap-2"
  >
    <img className="w-[22px]" src="/images/google.svg" alt="" />
    <p className="text-sm"> Masuk dengan Google</p>
  </button>
);

export default GoogleLoginButton;

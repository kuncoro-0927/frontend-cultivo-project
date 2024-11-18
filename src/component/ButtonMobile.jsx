import { LuArrowRight } from "react-icons/lu";
const ButtonMobile = () => {
  return (
    <>
      <div className="flex items-center ml-auto mt-2 md:hidden">
        <div className="py-2 px-2  rounded-full md:px-3 md:py-3 bg-button text-white md:rounded-full md:ml-2 lg:ml-2 lg:py-3 lg:px-3 items-center">
          <LuArrowRight className="lg:text-sm" />
        </div>
      </div>
    </>
  );
};

export default ButtonMobile;

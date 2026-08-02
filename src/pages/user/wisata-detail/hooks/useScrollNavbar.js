import { useEffect, useState } from "react";

export const useScrollNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowNavbar(
        currentScroll > 0 &&
          currentScroll < document.body.scrollHeight - window.innerHeight
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return showNavbar;
};

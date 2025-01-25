import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // pastikan ini sesuai dengan path Anda

const getInitials = (firstname, lastname) => {
  const firstInitial = firstname ? firstname.charAt(0).toUpperCase() : "N";
  const lastInitial = lastname ? lastname.charAt(0).toUpperCase() : "N";
  return `${firstInitial}${lastInitial}` || "NN";
};

const Avatar = () => {
  const { user, isLoading } = useAuth(); // Mengambil user dan isLoading dari AuthContext
  const [initials, setInitials] = useState("K");

  // Gunakan useEffect untuk mengupdate inisial ketika user berubah
  useEffect(() => {
    if (user) {
      const { firstname, lastname } = user;
      const initials = getInitials(firstname, lastname);
      setInitials(initials);
    }
  }, [user]); // Akan memicu setiap kali `user` berubah (termasuk setelah login)

  if (isLoading) {
    return <div>Loading...</div>; // Tampilkan loading jika data user masih diambil
  }

  return (
    <div className="avatar w-11 h-11 bg-hijau-muda rounded-full flex items-center justify-center text-xl font-bold text-white">
      {initials}
    </div>
  );
};

export default Avatar;

// import { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext"; // pastikan ini sesuai dengan path Anda

// const getInitials = (firstname, lastname) => {
//   const firstInitial = firstname ? firstname.charAt(0).toUpperCase() : "";
//   const lastInitial = lastname ? lastname.charAt(0).toUpperCase() : "";
//   return `${firstInitial}${lastInitial}` || "NN";
// };

// const Avatar = () => {
//   const { user } = useAuth(); // mengambil user dari AuthContext
//   const [initials, setInitials] = useState("");

//   // Gunakan useEffect untuk mengupdate inisial ketika user berubah
//   useEffect(() => {
//     if (user) {
//       const { firstname, lastname } = user;
//       const initials = getInitials(firstname, lastname);
//       setInitials(initials);
//     }
//   }, [user]); // Akan memicu setiap kali `user` berubah

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="avatar w-11 h-11 bg-hijau-muda rounded-full flex items-center justify-center text-xl font-bold text-white">
//       {initials}
//     </div>
//   );
// };

// export default Avatar;

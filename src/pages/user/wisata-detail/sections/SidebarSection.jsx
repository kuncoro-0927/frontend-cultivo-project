import BookingSidebar from "../components/BookingSidebar";
import WhyCultivoList from "../components/WhyCultivoList";

const SidebarSection = ({ wisataDetail, booking, wishlistState, shareMenu }) => {
  return (
    <div className=" ">
      <BookingSidebar
        wisataDetail={wisataDetail}
        booking={booking}
        wishlistState={wishlistState}
        shareMenu={shareMenu}
      />
      <WhyCultivoList />
    </div>
  );
};

export default SidebarSection;

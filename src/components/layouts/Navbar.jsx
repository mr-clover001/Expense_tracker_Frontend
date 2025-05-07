import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import { SIDE_MENU_DATA } from "../../utlis/data";
import { useNavigate } from "react-router-dom";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="w-full flex justify-between items-center gap-4 bg-white border-b border-gray-200 py-4 px-7 sticky top-0 z-30">
        <button
          className="lg:hidden text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <div>
          <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        </div>

        {/* SideMenu toggling */}
        {openSideMenu && (
          <div className="fixed top-[61px] bg-white z-20 lg:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

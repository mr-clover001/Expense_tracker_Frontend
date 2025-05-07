import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utlis/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import Modal from "./Modal";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");
  const { profileImageUrl, fullName } = localUser;
  const [isLogout, setIsLogout] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      // handleLogout();
      setIsLogout(true);
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    setIsLogout(false);
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 p-5 sticky top-[61px] z-10">
      <div className="flex flex-col items-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || fullName || ""}
        </h5>
      </div>

      {/* Side Menu Items */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
      <Modal
        isOpen={isLogout}
        onClose={() => setIsLogout(false)}
        title="Logout Confirmation"
      >
        <div className="card">
          Are you sure you want to Log out? This action cannot be undone.
          <div className="flex items-center justify-between mt-5">
            <div className="">
              <button
                type="button"
                className="add-btn add-btn-fill"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SideMenu;

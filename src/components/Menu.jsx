import React, { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { useMainState } from "./context/StateContext";
import DefaultAvatar from "../assets/images/avatar.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faList,
  faEye, faUserPlus,
  faBell, faSignOutAlt,
  faSignInAlt, faUser,
  faHeart
} from '@fortawesome/free-solid-svg-icons';

export const Menu = () => {
  const { openModal, currentUser, logout, navigate } = useMainState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const userAvatar = currentUser?.avatar?.url || DefaultAvatar;
  const userName = currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : "User Name";
  const userRole = currentUser?.role || "Role";

  // Handlers for various actions
  const handleLogout = () => { logout(); setIsDropdownOpen(false); };
  const handleLogin = () => { openModal("LOGIN"); setIsDropdownOpen(false); };
  const handleSignup = () => { openModal("SIGNUP"); setIsDropdownOpen(false); };
  const handleNavigate = (route) => { navigate(route); setIsDropdownOpen(false); };

  const handleAddLandlord = () => { openModal("ADD_LANDLORD"); setIsDropdownOpen(false); };


  const handleAddProperty = () => {
    openModal("ADD_PROPERTY");
    setIsDropdownOpen(false);
  }
  // Common menu items for all users
  const renderCommonMenuItems = () => (
    <>
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigate("/viewing")}>
        <FontAwesomeIcon icon={faEye} className="mr-4 text-gray-500" /> My Viewing
      </li>
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigate("/favorites")}>
        <FontAwesomeIcon icon={faHeart} className="mr-4 text-gray-500" /> Favorites
      </li>
    </>
  );

  // Menu for admin role
  const renderAdminMenu = () => (
    <>
      {renderCommonMenuItems()}
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleAddProperty}>
        <FontAwesomeIcon icon={faPlus} className="mr-4 text-gray-500" /> Add Property
      </li>
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigate("/my-properties")}>
        <FontAwesomeIcon icon={faList} className="mr-4 text-gray-500" /> My Properties
      </li>
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleAddLandlord}>
        <FontAwesomeIcon icon={faUserPlus} className="mr-4 text-gray-500" /> User Role
      </li>
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigate("/viewing-requests")}>
        <FontAwesomeIcon icon={faBell} className="mr-4 text-gray-500" /> Viewing Requests
      </li>
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-4 text-gray-500" /> Logout
      </li>
    </>
  );

  // Menu for landlord role
  const renderLandlordMenu = () => (
    <>
      {renderCommonMenuItems()}
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleAddProperty}>
        <FontAwesomeIcon icon={faPlus} className="mr-4 text-gray-500" /> Add Property
      </li>
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigate("/my-properties")}>
        <FontAwesomeIcon icon={faList} className="mr-4 text-gray-500" /> My Properties
      </li>
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigate("/viewing-requests")}>
        <FontAwesomeIcon icon={faBell} className="mr-4 text-gray-500" /> Viewing Requests
      </li>
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-4 text-gray-500" /> Logout
      </li>
    </>
  );

  // Menu for user role
  const renderUserMenu = () => (
    <>
      {renderCommonMenuItems()}
      <li className="p-2 hover:bg-gray-100 cursor-pointer">
        <FontAwesomeIcon icon={faBell} className="mr-4 text-gray-500" /> Notifications
      </li>
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-4 text-gray-500" /> Logout
      </li>
    </>
  );

  // Menu for non-authenticated users
  const renderAuthMenu = () => (
    <>
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogin}>
        <FontAwesomeIcon icon={faSignInAlt} className="mr-4 text-gray-500" /> Login
      </li>
      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleSignup}>
        <FontAwesomeIcon icon={faUser} className="mr-4 text-gray-500" /> Signup
      </li>
    </>
  );

  return (
    <div className="relative select-none">
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center">
          <img src={userAvatar} alt="Avatar" width={30} height={30} className="rounded-full bg-gray-300" />
        </div>
        <div className="flex items-center flex-col">
          <p className="text-sm">{userName}</p>
          <span className="text-xs -mt-[0.5]">{userRole}</span>
        </div>
        <RiArrowDownSLine onClick={toggleDropdown} size={20} className="cursor-pointer" />
      </div>
      {isDropdownOpen && (
        <div className="text-sm absolute top-[3.3rem] -right-2 w-[12rem] bg-white shadow-lg border border-gray-200 rounded-sm z-50">
          <ul>
            {currentUser ? (
              userRole === "admin" ? renderAdminMenu() :
                userRole === "user" ? renderUserMenu() :
                  userRole === "landlord" && renderLandlordMenu()
            ) : renderAuthMenu()}
          </ul>
        </div>
      )}
    </div>
  );
};

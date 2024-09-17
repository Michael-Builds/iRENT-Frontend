import React, { useState } from "react"
import Logo from "../../assets/images/logo.png"
import { SearchFilter } from "../SearchFilter"
import Tabs from "../home/Tabs"
import { useMainState } from "../context/StateContext"
import { Menu } from "../Menu"
import ErrorBoundary from '../ErrorBoundary';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Drawer } from "../Drawer"

const Navbar = () => {
  const { navigate } = useMainState();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };


  return (
    <section className="flex flex-col">
      <div className="pl-12 pr-12 max-sm:pl-3 max-sm:pr-3 h-[4.5rem] pt-2 pb-2 bg-white shadow-lg flex flex-row justify-between items-center">
        <img
          src={Logo}
          alt="Logo"
          width={100}
          height={100}
          onClick={handleLogoClick}
          className="cursor-pointer"
        />

        <SearchFilter />
        <ErrorBoundary>
          <div className="max-sm:hidden">
            <Menu />
          </div>
          <div className="hidden max-sm:block">
            <HiOutlineMenuAlt3 size={25} color={"#d2710a"} onClick={toggleDrawer} className="cursor-pointer" />
          </div>
        </ErrorBoundary>
      </div>
      <Tabs />
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </section>
  )
}

export default Navbar

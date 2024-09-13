import React from "react"
import Logo from "../../assets/images/logo.png"
import { SearchFilter } from "../SearchFilter"
import Tabs from "../home/Tabs"
import { useMainState } from "../context/StateContext"
import { Menu } from "../Menu"


const Navbar = () => {
  const { navigate } = useMainState();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <section className="flex flex-col">
      <div className="pl-12 pr-12 h-[4.5rem] pt-2 pb-2 bg-white shadow-lg flex flex-row justify-between items-center">
        <img
          src={Logo}
          alt="Logo"
          width={100}
          height={100}
          onClick={handleLogoClick}
          className="cursor-pointer"
        />
        <SearchFilter />
        <Menu />
      </div>
      <Tabs />
    </section>
  )
}

export default Navbar

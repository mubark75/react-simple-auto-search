import { useState } from "react";
import clsx from "clsx";

import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import MenuIcon from "@heroicons/react/24/outline/Bars3Icon";

import NavDialog from "./NavDialog";

export const navLinks = [
  { name: "HOLIDAY", href: "#" },
  { name: "WHAT", href: "#" },
  { name: "PRODUCTS", href: "#" },
  { name: "BESTSELLERS", href: "#" },
  { name: "GOODBYES", href: "#" },
  { name: "STORES", href: "#" },
  { name: "INSPIRATION", href: "#" },
];

export interface NavProps {
  onSearchButtonClick: () => void;
}

const Nav: React.FC<NavProps> = ({ onSearchButtonClick }) => {
  const [showNavDialog, setShowNavDialog] = useState(false);

  const openNavDialog = () => {
    setShowNavDialog(true);
  };

  const closeNavDialog = () => {
    setShowNavDialog(false);
  };

  return (
    <>
      <nav className={clsx("flex items-center flex-grow")}>
        {navLinks.map((navLink) => (
          <a
            key={navLink.name}
            href={navLink.href}
            className={clsx(
              "hidden md:block",
              "mx-2",
              "lowercase first-letter:uppercase"
            )}
          >
            {navLink.name}
          </a>
        ))}

        <button
          aria-label="search-button"
          className={clsx(
            "ml-auto rtl:mr-auto",
            "bg-none",
            "border-none",
            "cursor-pointer"
          )}
          onClick={onSearchButtonClick}
        >
          <SearchIcon className={clsx("w-6 h-6")} />
        </button>
        <button
          aria-label="menu-button"
          className={clsx(
            "block md:hidden",
            "ml-2 rtl:mr-2",
            "bg-none",
            "border-none",
            "cursor-pointer"
          )}
          onClick={openNavDialog}
        >
          <MenuIcon className={clsx("w-7 h-7")} />
        </button>
      </nav>

      <NavDialog isOpen={showNavDialog} onClose={closeNavDialog} />
    </>
  );
};

export default Nav;

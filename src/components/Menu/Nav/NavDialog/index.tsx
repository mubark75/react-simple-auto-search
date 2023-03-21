import clsx from "clsx";

import CloseIcon from "@heroicons/react/24/outline/XMarkIcon";

import Logo from "../../Logo";
import Dialog from "./Dialog";

import { navLinks } from "..";

export interface NavDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavDialog: React.FC<NavDialogProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className={clsx("border-b border-b-gray-100")}>
        <div
          className={clsx(
            "container",
            "flex justify-between items-center",
            "py-5"
          )}
        >
          <Logo />

          <button
            className={clsx(
              "block md:hidden",
              "bg-none",
              "border-none",
              "cursor-pointer"
            )}
            onClick={onClose}
          >
            <CloseIcon className={clsx("w-6 h-6")} />
          </button>
        </div>
      </div>

      <div className={clsx("container", "py-2")}>
        {navLinks.map((navLink) => (
          <a
            key={navLink.name}
            href={navLink.href}
            className={clsx(
              "block",
              "text-base lowercase first-letter:uppercase",
              "py-3"
            )}
          >
            {navLink.name}
          </a>
        ))}
      </div>
    </Dialog>
  );
};

export default NavDialog;

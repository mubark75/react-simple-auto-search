import { useState } from "react";
import clsx from "clsx";

import Logo from "./Logo";
import Nav from "./Nav";
import SearchDialog from "./SearchDialog";

const Menu = () => {
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  const openSearchDialog = () => {
    setShowSearchDialog(true);
  };

  const closeSearchDialog = () => {
    setShowSearchDialog(false);
  };

  return (
    <>
      <header className={clsx("border-b border-b-gray-100")}>
        <div
          className={clsx(
            "container",
            "flex items-center",
            "space-x-10 rtl:space-x-reverse",
            "py-5"
          )}
        >
          <Logo />

          <Nav onSearchButtonClick={openSearchDialog} />
        </div>
      </header>

      <SearchDialog isOpen={showSearchDialog} onClose={closeSearchDialog} />
    </>
  );
};

export default Menu;

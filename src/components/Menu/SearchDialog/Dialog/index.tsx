import React, { Fragment } from "react";
import { Dialog as HeadlessuiDialog, Transition } from "@headlessui/react";
import clsx from "clsx";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessuiDialog
        as="div"
        className={clsx("relative", "z-dialog")}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={clsx("fixed", "inset-0", "bg-black bg-opacity-25")} />
        </Transition.Child>

        <div className={clsx("fixed", "inset-0", "overflow-y-auto")}>
          <div className={clsx("flex", "w-full min-h-full md:min-h-[auto]")}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-0 scale-95"
            >
              <HeadlessuiDialog.Panel
                className={clsx(
                  "w-full",
                  "bg-white",
                  "transition-all",
                  "align-middle",
                  "overflow-hidden",
                  "md:shadow-sm"
                )}
              >
                {children}
              </HeadlessuiDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessuiDialog>
    </Transition>
  );
};

export default Dialog;

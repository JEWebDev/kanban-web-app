"use client";
import IconLogoDark from "../icons/IconLogoDark";
import IconLogoMobile from "../icons/IconLogoMobile";
import IconPlus from "../icons/IconPlus";
import ActionMenu from "../ui/ActionMenu";
import NavDropodown from "../ui/NavDropdown";
import PrimaryButton from "../ui/PrimaryButton";

export function Header() {
  return (
    <header className="w-full h-16 md:h-20 bg-white dark:bg-dark-grey-bg flex items-center gap-4 md:gap-6 shadow-sm dark:shadow-none col-span-2">
      <div className="flex items-center md:w-65 lg:w-75 h-full py-5 md:border-r border-lines-light dark:border-lines-dark pl-4">
        <IconLogoDark className="w-38.5 h-6.25 hidden md:block" />
        <IconLogoMobile className="w-6 h-6 md:hidden" />
      </div>

      <NavDropodown />

      <h1 className="heading-l hidden md:block">Platform Launch</h1>

      <div className="flex gap-3 items-center ml-auto pr-4">
        <PrimaryButton
          disabled={true}
          className=" w-12 h-8 flex md:w-full md:h-full md:px-6 md:py-3.5 items-center justify-center"
        >
          <IconPlus className="w-4 h-4 md:hidden" />
          <span className="hidden md:inline">+ Add New Task</span>
        </PrimaryButton>

        <ActionMenu
          onEditClick={() => {
            console.log("clicked edit button");
          }}
          onDeleteClick={() => {
            console.log("clicked delete button");
          }}
        />
      </div>
    </header>
  );
}
export default Header;

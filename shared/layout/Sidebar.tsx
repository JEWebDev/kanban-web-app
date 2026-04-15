"use client";
import IconEyeOff from "../icons/IconEyeOff";
import BoardItem from "../ui/BoardItem";
import ThemeSwitch from "../ui/ThemeSwitch";
function Sidebar() {
  const boards = [
    { board_id: "asasdfr", name: "Platform Launch", columns: [] },
    { board_id: "eqwerqa", name: "Marketing Plan", columns: [] },
    { board_id: "zxcvbnm", name: "Roadmap", columns: [] },
  ];
  return (
    <aside className="md:w-65 lg:w-75 bg-white dark:bg-dark-grey-bg pr-6 border-r border-lines-light dark:border-lines-dark hidden md:flex md:flex-col justify-between pt-5 pb-8">
      <div>
        <p className="heading-s pl-4  mb-5 uppercase text-medium-grey">
          All boards (0)
        </p>

        <ul className="flex flex-col">
          {boards.map((board) => (
            <BoardItem key={board.board_id} board={board} active={false} />
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <ThemeSwitch />
        <button
          className="w-full pl-6 py-3.5 lg:pl-8 text-medium-grey heading-m flex items-center gap-2.5 hover:cursor-pointer hover:bg-light-grey-bg rounded-tr-[100px] rounded-br-[100px] hover:text-main-purple dark:hover:bg-white"
          onClick={() => {}}
        >
          <IconEyeOff className="w-4.5 h-4" />
          Hide Sidebar
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

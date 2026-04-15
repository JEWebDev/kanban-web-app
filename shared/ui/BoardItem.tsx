import Link from "next/link";
import IconBoard from "../icons/IconBoard";
import { Board } from "@/types/types";
interface BoardItemProps {
  board: Board;
  onClick?: () => void;
  active: boolean;
}

function BoardItem({ board, active, onClick }: BoardItemProps) {
  return (
    <li
      className={`heading-m text-medium-grey rounded-tr-[100px] rounded-br-[100px] ${
        active
          ? "bg-main-purple text-white  cursor-default"
          : "hover:cursor-pointer hover:bg-light-grey-bg dark:hover:bg-white hover:text-main-purple"
      }
                
        `}
    >
      <Link
        href={`/${board.board_id}`}
        prefetch={true}
        className="py-3.75 pl-6 flex items-center gap-4 w-full h-full"
        onClick={onClick}
      >
        <IconBoard className="w-4 h-4" />
        {board.name}
      </Link>
    </li>
  );
}

export default BoardItem;

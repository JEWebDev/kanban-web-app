import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewBoardSchema } from "./schemas/NewBoardSchema";
import { useCreateBoard } from "./useBoards";

export const useCreateBoardModal = () => {
  const methods = useForm({
    resolver: zodResolver(NewBoardSchema),
    mode: "onSubmit",
    defaultValues: {
      boardName: "",
      boardColumns: [{ name: "To Do" }, { name: "Doing" }],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate: createBoard, isPending } = useCreateBoard();

  const createNewBoard = handleSubmit((data) => {
    const board = {
      boardName: data.boardName,
      boardColumns: data.boardColumns.map((col) => col.name),
    };
    createBoard(board);
  });

  return {
    register,
    createNewBoard,
    isPending,
    errors,
    methods,
  };
};

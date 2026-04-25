import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBoard, getAllBoards, getBoardById } from "./actions";
import { useRouter } from "next/navigation";

export function useAllBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getAllBoards,
  });
}

export function useBoardById(boardId: string) {
  return useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoardById(boardId),
    enabled: !!boardId,
  });
}

export function useCreateBoard() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: createBoard,
    onSuccess: async (boardId) => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] });
      if (router) router.push(`/boards`);
    },
  });
}

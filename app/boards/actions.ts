"use server";

import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database";

export interface CreateBoardProps {
  boardName: string;
  boardColumns: string[];
}

export const getAllBoards = async () => {
  const supabase = await createClient<Database>();
  const { data, error } = await supabase
    .from("boards")
    .select("board_id, name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching boards:", error);
  }
  return data;
};

export const getBoardById = async (boardId: string) => {
  const supabase = await createClient<Database>();
  const { data, error } = await supabase
    .from("boards")
    .select("board_id, name, columns (column_id, name, tasks(*, subtasks(*)))")
    .eq("board_id", boardId)
    .single();

  if (error) {
    console.error("Error fetching board by id:", error);
  }
  return data;
};

export const createBoard = async ({
  boardName,
  boardColumns,
}: CreateBoardProps) => {
  if (!boardName || boardName.trim() === "")
    throw new Error("Board name is required");

  const supabase = await createClient<Database>();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    throw new Error(userError.message);
  }

  const { data, error } = await supabase.rpc("create_board", {
    p_user_id: user?.id,
    board_name: boardName,
    column_names: boardColumns,
  });
  if (error) {
    throw new Error(error.message);
  }

  const { board_id } = data as { board_id: string };
  return board_id;
};

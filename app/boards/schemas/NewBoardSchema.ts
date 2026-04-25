import z from "zod";

export const NewBoardSchema = z.object({
  boardName: z
    .string()
    .min(1, "Can't be empty")
    .max(100, "Must be less than 100 characters"),
  boardColumns: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().max(100),
      }),
    )
    .transform((columns) => columns.filter((col) => col.name.trim() !== "")),
});

export type NewBoardData = z.infer<typeof NewBoardSchema>;

import { useDialog } from "@/shared/layout/hooks/useDialog";
import PrimaryButtonSmall from "@/shared/ui/PrimaryButtonSmall";
import TextInput from "@/shared/ui/TextInput";
import { FormProvider } from "react-hook-form";
import Fieldset from "@/shared/ui/Fieldset";
import { useCreateBoardModal } from "./useCreateBoardModal";

function CreateBoardModal() {
  const { dialogRef, closeDialog, handleClickOutside } = useDialog();

  const { errors, methods, isPending, register, createNewBoard } =
    useCreateBoardModal();

  return (
    <dialog
      ref={dialogRef}
      onClose={closeDialog}
      onClick={handleClickOutside}
      className="mx-auto my-auto p-6 md:p-8 max-h-168.5 md:max-h-176 bg-white dark:bg-dark-grey-bg backdrop:bg-black/50 rounded-sm md:rounded-md min-w-85.75 md:min-w-120 text-black dark:text-white "
    >
      <h2 className="heading-l mb-6">Add New Board</h2>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-6" onSubmit={createNewBoard}>
          <TextInput
            label="Board Name"
            {...register("boardName")}
            error={errors.boardName?.message}
            placeholder="e.g. Web Design"
          />
          <Fieldset label="Board Columns" />
          <PrimaryButtonSmall type="submit">
            Create New Board
          </PrimaryButtonSmall>
        </form>
      </FormProvider>
    </dialog>
  );
}

export default CreateBoardModal;

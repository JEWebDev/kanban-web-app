import { NewBoardData } from "@/app/boards/schemas/NewBoardSchema";
import { useFieldArray, useFormContext } from "react-hook-form";
import TextInput from "./TextInput";
import IconCross from "../icons/IconCross";
import SecondaryButtonSmall from "./SecondaryButtonSmall";

function Fieldset({ label }: { label: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<NewBoardData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "boardColumns",
  });
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="label">{label}</legend>
      {fields.map((field, index) => (
        <div className="w-full flex items-center gap-4" key={field.id}>
          <TextInput
            label=""
            className="flex-1"
            error={errors.boardColumns?.[index]?.name?.message}
            {...register(`boardColumns.${index}.name`)}
          />
          <button
            className="hover:cursor-pointer"
            type="button"
            onClick={() => {
              if (fields.length > 2) remove(index);
              return;
            }}
          >
            <IconCross className="w-4 h-4" />
          </button>
        </div>
      ))}

      <SecondaryButtonSmall
        type="button"
        onClick={() => {
          append({ name: "" });
        }}
      >
        + Add New Column
      </SecondaryButtonSmall>
    </fieldset>
  );
}
export default Fieldset;

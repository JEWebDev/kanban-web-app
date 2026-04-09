interface TextInputProps {
  label: string;
  name: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  defaultValue?: string;
  error?: string;
}
function TextInput({
  label,
  name,
  value,
  type,
  onChange,
  className,
  defaultValue,
  error,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`text-input body-m ${error ? "border-red-500" : ""} ${className ?? ""}`}
        defaultValue={defaultValue}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}

export default TextInput;

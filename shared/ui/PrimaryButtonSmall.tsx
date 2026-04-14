import { ButtonProps } from "@/types/types";

function PrimaryButtonSmall({
  children,
  onClick,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`button-small button-primary ${className ?? ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default PrimaryButtonSmall;

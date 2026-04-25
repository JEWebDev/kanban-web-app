import { ButtonProps } from "@/types/types";

function PrimaryButton({
  children,
  onClick,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`button button-primary ${className ?? ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default PrimaryButton;

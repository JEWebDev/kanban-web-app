import { ButtonProps } from "@/types/types";

function PrimaryButtonSmall({ children, onClick, className }: ButtonProps) {
  return (
    <button
      className={`button-small button-primary ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default PrimaryButtonSmall;

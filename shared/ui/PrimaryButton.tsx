import { ButtonProps } from "@/types/types";

function PrimaryButton({ children, onClick, className }: ButtonProps) {
  return (
    <button
      className={`button button-primary ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default PrimaryButton;

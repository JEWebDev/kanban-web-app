import { ButtonProps } from "@/types/types";

function SecondaryButton({ children, type, className, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      className={`button button-secondary ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default SecondaryButton;

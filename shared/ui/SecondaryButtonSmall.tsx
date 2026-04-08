import { ButtonProps } from "@/types/types";

function SecondaryButtonSmall({
  children,
  type,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button-small button-secondary hover:button-hover ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default SecondaryButtonSmall;

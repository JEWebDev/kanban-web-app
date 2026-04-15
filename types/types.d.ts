export interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
export interface Board {
  board_id: string;
  name: string;
  columns?: Column[];
}

import { SVGProps } from "react";

function IconPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        fill="currentColor"
        d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1 -2 0v-6h-6a1 1 0 0 1 0 -2h6v-6a1 1 0 0 1 1 -1"
      />
    </svg>
  );
}

export default IconPlus;

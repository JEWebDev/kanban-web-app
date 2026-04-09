import { GitHub } from "@/shared/icons/IconGithub";
function GithubButton({
  onClick,
  type,
}: {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full border disabled:bg-neutral-500 disabled:border-neutral-500 flex font-bold font-secondary italic items-center justify-center px-5 text-center tracking-wider transition-colors rounded-full uppercase gap-2 whitespace-nowrap bg-neutral-900 border-neutral-900 hover:bg-neutral-700 hover:border-neutral-700 text-white py-2 text-sm hover:cursor-pointer"
    >
      Login with GitHub <GitHub className="w-5 h-5.5" />
    </button>
  );
}
export default GithubButton;

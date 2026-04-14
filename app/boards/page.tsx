"use client";
import { logout } from "../(auth)/login/actions";
function BoardContent() {
  return (
    <main>
      <h1>Here goes the board content, only logged users can see this page</h1>
      <button
        className="bg-blue-500 text-white p-2 rounded-sm mx-auto"
        onClick={() => logout()}
      >
        Log Out
      </button>
    </main>
  );
}
export default BoardContent;

import Header from "@/shared/layout/Header";
import Sidebar from "@/shared/layout/Sidebar";

export function BoardLayout({ children }: { children: React.ReactNode }) {
  const sidebarIsOpen = true;
  return (
    <div
      className={`grid grid-cols-[1fr] grid-rows-[auto_1fr] ${sidebarIsOpen ? "md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]" : "md:grid-cols-[1fr]"} md:grid-rows-[auto_1fr] h-screen bg-light-grey-bg dark:bg-very-dark-grey-bg`}
    >
      <Header />
      <Sidebar />
      <main className="w-full h-full flex gap-6 overflow-x-auto overflow-y-hidden bg-light-grey-bg dark:bg-very-dark-grey-bg p-6">
        {children}
      </main>
    </div>
  );
}
export default BoardLayout;

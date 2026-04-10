import Header from "@/shared/layout/Header";
import Sidebar from "@/shared/layout/Sidebar";

export function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <Sidebar />
      {children}
    </section>
  );
}
export default BoardLayout;

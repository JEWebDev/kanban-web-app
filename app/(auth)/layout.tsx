export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 flex h-screen items-center bg-light-grey-bg">
      <main className="w-full  md:max-w-130.5 mx-auto my-auto px-4 py-10 md:px-8 md:py-12 rounded-xl bg-white shadow-md">
        {children}
      </main>
    </div>
  );
}
export default AuthLayout;

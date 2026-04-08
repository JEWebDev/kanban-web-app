export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center bg-blue-200">
      <main className="mx-auto my-auto p-6 bg-white">{children}</main>
    </div>
  );
}
export default AuthLayout;

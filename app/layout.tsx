import type { Metadata } from "next";
import "./globals.css";
import { ThemeWrapper } from "@/shared/layout/ThemeProvider";

export const metadata: Metadata = {
  title: "Kanban Task Management App",
  description:
    "Kanban is a task management web app built with Next.js, TypeScript, and Tailwind CSS. It allows users to create boards, lists, and cards to organize their tasks visually. The app features drag-and-drop functionality for easy task management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeWrapper>
          <>{children}</>
        </ThemeWrapper>
      </body>
    </html>
  );
}

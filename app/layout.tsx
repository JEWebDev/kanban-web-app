import type { Metadata } from "next";
import "./globals.css";
import { ThemeWrapper } from "@/shared/layout/ThemeProvider";
import Providers from "@/shared/layout/QueryContext";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllBoards } from "./boards/actions";

export const metadata: Metadata = {
  title: "Kanban Task Management App",
  description:
    "Kanban is a task management web app built with Next.js, TypeScript, and Tailwind CSS. It allows users to create boards, lists, and cards to organize their tasks visually. The app features drag-and-drop functionality for easy task management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["boards"],
    queryFn: getAllBoards,
  });
  return (
    <html lang="en" className={`h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ThemeWrapper>
              <>{children}</>
            </ThemeWrapper>
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}

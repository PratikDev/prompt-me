import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "PromptMe",
  description: "Explore and Share AI-Enhanced Prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTopLoader showSpinner={false} color="#6b7280" crawl />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />

          <main className="relative mx-6 md:mx-16 my-8 xs:my-12">
            {children}
          </main>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

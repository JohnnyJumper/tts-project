import { Html, Head, Main, NextScript } from "next/document";
import { cn } from "@/lib/utils";

export default function Document() {
  return (
    <Html lang="en" className={cn("root")}>
      <Head />
      <body className={cn("min-h-screen bg-background font-sans antialiased no-scrollbar")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

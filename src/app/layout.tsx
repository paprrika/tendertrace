import type { Metadata } from "next";
import "@rainbow-me/rainbowkit/styles.css";
import "@fontsource-variable/archivo";
import "./globals.css";
import "./quality.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "TenderTrace | GenLayer",
  description: "Check tender submissions against public requirements without deciding price or award.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Providers>{children}</Providers></body></html>;
}

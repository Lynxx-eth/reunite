import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reunite — Global Missing Persons Network",
  description:
    "A worldwide platform to help find missing children and adults. Search real, verified missing-person cases, share them, and help bring people home.",
  keywords: ["missing persons", "missing children", "find missing", "reunite", "amber alert"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

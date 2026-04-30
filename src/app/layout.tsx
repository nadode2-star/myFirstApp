import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "우주 탐험 앱",
  description: "Next.js와 Prisma로 구축된 프리미엄 우주 탐험 웹 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}

// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'קמפיין לבניית מקווה חדש בגבעת מרדכי',
  description: 'עצומה תושבות לבניית מקווה חדש בגבעת מרדכי',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
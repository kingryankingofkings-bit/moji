import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Moji - Emoji Keyboard',
  description: 'Fast, feature-rich emoji keyboard for Android, iOS, and desktop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

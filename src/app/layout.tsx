import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { QuizProvider } from '@/context/QuizContext';

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Who wants to be a millionaire?',
  description: 'Headway test task',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={interFont.variable}>
        <QuizProvider>{children}</QuizProvider>
      </body>
    </html>
  );
}

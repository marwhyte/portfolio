import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ReactNode } from 'react';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marco Whyte',
  description: "A glimbse into Marco's life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className='!scroll-smooth' lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <main className='min-h-screen bg-white dark:bg-gray-900'>
            <Header />
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}

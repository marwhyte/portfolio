import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './gallery.css';
import { Providers } from './providers';
import { ReactNode } from 'react';
import Header from './components/header';
import Footer from './components/footer';

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
          <div className='bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>
            <Header />
            <div
              style={{ minHeight: 'calc(100vh - 76px)' }}
              className='flex flex-col'
            >
              <main className='flex-grow'>
                <div>{children}</div>
              </main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

import Link from 'next/link';

import { ReactNode } from 'react';

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className='transition hover:text-teal-500 dark:hover:text-teal-400'
    >
      {children}
    </Link>
  );
}

const Footer = () => {
  return (
    <footer className='flex-none'>
      <div className='mx-auto w-full max-w-7xl lg:px-8'>
        <div className='border-t border-gray-100 pb-16 pt-10 dark:border-gray-700/40'>
          <div className='mx-auto max-w-2xl lg:max-w-5xl'>
            <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
              <div className='flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-gray-800 dark:text-gray-200'>
                <NavLink href='/'>Home</NavLink>
                <NavLink href='/blog'>Blog</NavLink>
                <NavLink href='#work'>My work</NavLink>
                <NavLink href='#contact'>Contact</NavLink>
              </div>
              <p className='max-w-[400px] px-4 text-center text-sm text-gray-600 dark:text-gray-400 lg:px-0 lg:text-left'>
                This site was coded by me in{' '}
                <Link
                  className='text-gray-400 hover:!text-teal-500 dark:text-gray-300'
                  rel='noopener noreferrer'
                  target='_blank'
                  href='https://code.visualstudio.com/'
                >
                  Visual Studio Code
                </Link>{' '}
                using{' '}
                <Link
                  className='text-gray-400 hover:!text-teal-500 dark:text-gray-300'
                  rel='noopener noreferrer'
                  target='_blank'
                  href='https://nextjs.org/'
                >
                  Next.js
                </Link>{' '}
                and{' '}
                <Link
                  className='text-gray-400 hover:!text-teal-500 dark:text-gray-300'
                  rel='noopener noreferrer'
                  target='_blank'
                  href='https://tailwindcss.com/'
                >
                  Tailwind CSS
                </Link>
                . It is deployed using{' '}
                <Link
                  className='text-gray-400 hover:!text-teal-500 dark:text-gray-300'
                  rel='noopener noreferrer'
                  target='_blank'
                  href='https://vercel.com/'
                >
                  Vercel
                </Link>
                . Check out the source code{' '}
                <Link
                  className='text-gray-400 hover:!text-teal-500 dark:text-gray-300'
                  rel='noopener noreferrer'
                  target='_blank'
                  href='https://github.com/marwhyte/portfolio'
                >
                  here
                </Link>
                !
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

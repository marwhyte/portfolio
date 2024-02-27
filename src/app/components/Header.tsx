'use client';

import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import SocialIcons from './SocialIcons';

const Header = () => {
  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'About me', href: '#' },
    { name: 'My work', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolledDown(window.scrollY >= 100);
    };
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className='sticky top-0 z-50 bg-transparent'>
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8 ${hasScrolledDown ? 'bg-white shadow-sm transition-all duration-300 ease-in-out dark:bg-gray-900 lg:!bg-transparent lg:shadow-none' : ''}`}
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <a href='#' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Marco Whyte</span>
            <img
              className='h-8 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt=''
            />
          </a>
        </div>
        <div
          className={`hidden transition-all duration-300 ease-in-out lg:flex lg:gap-x-12 ${hasScrolledDown ? 'rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10' : ''}`}
        >
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm font-semibold leading-6 text-gray-900 hover:!text-teal-500 dark:text-white'
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className='flex flex-1 items-center justify-end gap-x-6'>
          <DarkModeToggle />
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-gray-900 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center gap-x-6'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Marco Whyte</span>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                alt=''
              />
            </a>
            <div className='ml-auto flex items-center justify-center gap-x-6'>
              <SocialIcons />
            </div>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-zinc-800 dark:text-zinc-400'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;

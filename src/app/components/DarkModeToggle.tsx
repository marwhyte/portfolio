'use client';

import { MoonIcon } from '@heroicons/react/16/solid';
import { CogIcon, PlusIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { type } from 'os';
import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <CogIcon />;

  if (resolvedTheme === 'dark') {
    return (
      <button
        onClick={() => setTheme('light')}
        type='button'
        className='rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      >
        <SunIcon className='h-5 w-5' aria-hidden='true' />
      </button>
    );
  }

  if (resolvedTheme === 'light') {
    return (
      <button
        onClick={() => setTheme('dark')}
        type='button'
        className='rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      >
        <MoonIcon className='h-5 w-5' aria-hidden='true' />
      </button>
    );
  }
};

export default DarkModeToggle;

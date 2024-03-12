'use client';

import SocialIcons from './social-icons';
import Image from 'next/image';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { Button } from './button';

const Hero = () => {
  return (
    <div className='relative isolate min-h-screen bg-white pt-14 dark:bg-gray-900'>
      <div
        className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className='pb-24 lg:pb-40 lg:pt-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <Image
              className='mb-10 inline-block grow rounded-full'
              src='/avatar.png'
              width={100}
              height={100}
              alt=''
            />
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl sm:text-6xl'>
              Marco Whyte
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300'>
              Welcome! I am a full-stack developer who loves to build things.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <SocialIcons />
            </div>
            <div className='mt-8 flex animate-bounce items-center justify-center gap-x-6 lg:mt-24'>
              <Button variant='tertiary' href='#skills'>
                <ArrowDownCircleIcon className='h-6 w-6' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

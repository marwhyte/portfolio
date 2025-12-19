'use client';

import SocialIcons from './social-icons';
import Image from 'next/image';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import Button from './button';
import { WavyBackground } from './wavy-background';

const Hero = () => {
  return (
    <div className='relative isolate min-h-screen bg-white dark:bg-gray-900'>
      <WavyBackground
        containerClassName='absolute inset-0 -z-10'
        colors={['#ff80b5', '#9089fc', '#6366f1', '#8b5cf6']}
        waveOpacity={0.3}
        blur={20}
        speed='slow'
        backgroundFill='#111827'
      />

      <div className='pb-24 lg:pb-40 lg:pt-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <Image
              className='mb-10 inline-block grow rounded-full'
              src='/avatar.png'
              width={100}
              height={100}
              alt='Marco Whyte'
              priority
              quality={90}
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
              <Button variant='tertiary' href='/#skills'>
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

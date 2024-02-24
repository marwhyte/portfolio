'use client';

import Link from 'next/link';
import { ComponentType, SVGProps, useEffect, useRef, useState } from 'react';
import { GitHubIcon, LinkedInIcon, XIcon } from './SocialIcons';
import Image from 'next/image';
import Header from './Header';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

type IconLinkProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
};

const IconLink = ({ icon: Icon, ...props }: IconLinkProps) => {
  return (
    <Link className='group -m-1 p-1' {...props}>
      <Icon className='h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300' />
    </Link>
  );
};

const Hero = () => {
  const [isSticky, setSticky] = useState(false);
  const avatarRef = useRef(null); // Ref for the avatar element

  useEffect(() => {
    const current = avatarRef.current;

    const observer = new IntersectionObserver(
      ([e]) => setSticky(e.intersectionRatio < 1),
      { threshold: [1] }
    );

    if (avatarRef.current) observer.observe(avatarRef.current);

    // Clean up the observer on unmount
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div className='relative isolate bg-white pt-14 dark:bg-gray-900'>
      <Header isSticky={isSticky} />

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
      <div className='py-24 sm:py-32 lg:pb-40'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <Image
              className='mb-10 inline-block grow rounded-full'
              src='/avatar.png'
              width={180}
              height={180}
              alt=''
            />
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl sm:text-6xl'>
              Marco Whyte
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300'>
              Welcome! I am a full-stack developer who loves to build things.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <IconLink
                icon={GitHubIcon}
                href='https://github.com/marcowhyte'
                aria-label='GitHub'
              />
              <IconLink
                icon={LinkedInIcon}
                href='https://www.linkedin.com/in/marcowhyte/'
                aria-label='LinkedIn'
              />
              <IconLink
                icon={XIcon}
                href='https://twitter.com/marcowhyte'
                aria-label='Twitter'
              />
            </div>
            <div className='mt-10 flex animate-bounce items-center justify-center gap-x-6'>
              <Button variant='tertiary' href='#projects'>
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

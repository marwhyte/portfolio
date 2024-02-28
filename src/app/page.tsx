import {
  ArrowDownIcon,
  BriefcaseIcon,
  EnvelopeIcon,
} from '@heroicons/react/16/solid';
import Hero from './components/Hero';
import Projects from './components/Projects';

import grayceLogo from '../../public/grayce-logo.png';
import modernizeMeLogo from '../../public/modernize-me-logo.png';
import connectOurKidsLogo from '../../public/connect-our-kids-logo.png';
import Image, { type ImageProps } from 'next/image';
import { Button } from './components/Button';
import Skills from './components/Skills';
import { FormEvent } from 'react';

function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data);
  };

  return (
    <form className='rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40'>
      <h2 className='flex text-sm font-semibold text-zinc-900 dark:text-zinc-100'>
        <EnvelopeIcon className='h-6 w-6 flex-none' />
        <span className='ml-3'>Get in contact</span>
      </h2>
      <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
        Leave a message and I will get back to you as soon as possible.
      </p>
      <div className='mt-6 w-full'>
        <textarea
          placeholder='Message'
          aria-label='Message'
          required
          className='w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm'
        />
      </div>
      <div className='mt-2 flex'>
        <input
          type='email'
          placeholder='Email address'
          aria-label='Email address'
          required
          className='min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm'
        />

        <Button type='submit' className='ml-4 flex-none'>
          Send
        </Button>
      </div>
    </form>
  );
}

interface RoleType {
  company: string;
  title: string;
  logo: ImageProps['src'];
  start: string | { label: string; dateTime: string };
  end: string | { label: string; dateTime: string };
}

function Role({ role }: { role: RoleType }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label;
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime;

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label;
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime;

  return (
    <li className='flex gap-4'>
      <div className='relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0'>
        <Image src={role.logo} alt='' className='h-7 w-7' unoptimized />
      </div>
      <dl className='flex flex-auto flex-wrap gap-x-2'>
        <dt className='sr-only'>Company</dt>
        <dd className='w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100'>
          {role.company}
        </dd>
        <dt className='sr-only'>Role</dt>
        <dd className='text-xs text-zinc-500 dark:text-zinc-400'>
          {role.title}
        </dd>
        <dt className='sr-only'>Date</dt>
        <dd
          className='ml-auto text-xs text-zinc-400 dark:text-zinc-500'
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden='true'>—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  );
}

function Resume() {
  let resume: Array<RoleType> = [
    {
      company: 'Grayce',
      title: 'Software Engineer',
      logo: grayceLogo,
      start: '2020',
      end: '2024',
    },
    {
      company: 'Connect our Kids',
      title: 'Software Internship',
      logo: connectOurKidsLogo,
      start: '2020',
      end: '2020',
    },
    {
      company: 'ModernizeMe',
      title: 'Freelance developer',
      logo: modernizeMeLogo,
      start: '2018',
      end: '2020',
    },
  ];

  return (
    <div className='rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40'>
      <h2 className='flex text-sm font-semibold text-zinc-900 dark:text-zinc-100'>
        <BriefcaseIcon className='h-6 w-6 flex-none' />
        <span className='ml-3'>Work</span>
      </h2>
      <ol className='mt-6 space-y-4'>
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href='#' variant='secondary' className='group mt-6 w-full'>
        Download CV
        <ArrowDownIcon className='h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50' />
      </Button>
    </div>
  );
}

export default function Home() {
  return (
    <main className='bg-white dark:bg-gray-900'>
      <Hero />
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <Skills />
      </div>
      <div className='mx-auto mt-24 max-w-5xl md:mt-28'>
        <div className='mx-auto grid max-w-xl grid-cols-1  gap-y-20 px-6 lg:max-w-none lg:grid-cols-2'>
          <div className='px-6 lg:px-0'>
            <Projects />
          </div>
          <div className='mb-24 space-y-10 lg:pl-16 xl:pl-24'>
            <Contact />
            <Resume />
          </div>
        </div>
      </div>
    </main>
  );
}

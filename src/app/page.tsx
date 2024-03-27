import { BriefcaseIcon } from '@heroicons/react/16/solid';
import Hero from './components/hero';
import Projects from './components/projects';

import grayceLogo from '../../public/grayce-logo.png';
import modernizeMeLogo from '../../public/modernize-me-logo.png';
import connectOurKidsLogo from '../../public/connect-our-kids-logo.png';
import Image, { type ImageProps } from 'next/image';
import Skills from './components/skills';
import ContactForm from './components/contact-form';

interface RoleType {
  company: string;
  title: string;
  logo: ImageProps['src'];
  start: string | { label: string; dateTime: string };
  end: string | { label: string; dateTime: string };
}

function Role({ role }: { role: RoleType }) {
  const startLabel =
    typeof role.start === 'string' ? role.start : role.start.label;
  const startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime;

  const endLabel = typeof role.end === 'string' ? role.end : role.end.label;
  const endDate = typeof role.end === 'string' ? role.end : role.end.dateTime;

  return (
    <li className='flex gap-4'>
      <div className='relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-gray-800/5 ring-1 ring-gray-900/5 dark:border dark:border-gray-700/50 dark:bg-gray-800 dark:ring-0'>
        <Image src={role.logo} alt='' className='h-7 w-7' unoptimized />
      </div>
      <dl className='flex flex-auto flex-wrap gap-x-2'>
        <dt className='sr-only'>Company</dt>
        <dd className='w-full flex-none text-sm font-medium text-gray-900 dark:text-gray-100'>
          {role.company}
        </dd>
        <dt className='sr-only'>Role</dt>
        <dd className='text-xs text-gray-500 dark:text-gray-400'>
          {role.title}
        </dd>
        <dt className='sr-only'>Date</dt>
        <dd
          className='ml-auto text-xs text-gray-400 dark:text-gray-500'
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
  const resume: Array<RoleType> = [
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
    <div
      id='work'
      style={{ scrollMarginTop: '75px' }}
      className='rounded-2xl border border-gray-100 p-6 dark:border-gray-700/40'
    >
      <h2 className='flex text-sm font-semibold text-gray-900 dark:text-gray-100'>
        <BriefcaseIcon className='h-6 w-6 flex-none' />
        <span className='ml-3'>Work</span>
      </h2>
      <ol className='mt-6 space-y-4'>
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      {/* <Button href='#' variant='secondary' className='group mt-6 w-full'>
        Download CV
        <ArrowDownIcon className='h-4 w-4 stroke-gray-400 transition group-active:stroke-gray-600 dark:group-hover:stroke-gray-50 dark:group-active:stroke-gray-50' />
      </Button> */}
    </div>
  );
}

export default function Home() {
  return (
    <>
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
            <ContactForm />
            <Resume />
          </div>
        </div>
      </div>
    </>
  );
}

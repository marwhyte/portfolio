import Card from './card';
import filloutIcon from '../../../public/fillout-icon.svg';
import ziteLogo from '../../../public/zite.png';
import Image from 'next/image';
import { LinkIcon } from '@heroicons/react/20/solid';

const Projects = () => {
  const projects = [
    {
      name: 'Zite',
      description:
        'The AI builder that means business. Describe what you need and Zite builds your apps, workflows, and databases — auth, hosting, and security handled for you.',
      link: { href: 'https://zite.com', label: 'zite.com' },
      logo: ziteLogo,
    },
    {
      name: 'Fillout',
      description:
        'The all-in-one form solution. Build powerful forms, surveys, and quizzes in minutes — with scheduling, payments, and hundreds of integrations built in.',
      link: { href: 'https://www.fillout.com', label: 'fillout.com' },
      logo: filloutIcon,
    },
  ];

  return (
    <div
      style={{ scrollMarginTop: '75px', marginBottom: '50px' }}
      id='projects'
    >
      <div className='flex flex-col gap-16'>
        {projects.map((project) => (
          <Card key={project.name}>
            <div className='h-12 relative z-10 flex w-12 items-center justify-center rounded-full bg-white shadow-md shadow-gray-800/5 ring-1 ring-gray-900/5 dark:border dark:border-gray-700/50 dark:bg-gray-800 dark:ring-0'>
              <Image src={project.logo} alt='' className='h-8 w-8' />
            </div>
            <h2 className='mt-6 text-base font-semibold text-gray-800 dark:text-gray-100'>
              <Card.Link href={project.link.href} target='_blank'>
                {project.name}
              </Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className='relative mt-6 flex text-sm font-medium text-gray-400 transition group-hover:text-teal-500 dark:text-gray-200'>
              <LinkIcon className='h-6 w-6 flex-none' />
              <span className='ml-2'>{project.link.label}</span>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;

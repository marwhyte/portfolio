import { Card } from './card';
import graphMakerLogo from '../../../public/graph-maker-logo.png';
import Image from 'next/image';
import { LinkIcon } from '@heroicons/react/20/solid';

const Projects = () => {
  const projects = [
    {
      name: 'GraphMaker',
      description:
        'Instantly generate graphs using AI and communicate with your data using natural language.',
      link: { href: 'https://graphmaker.ai', label: 'graphmaker.ai' },
      logo: graphMakerLogo,
    },
  ];

  return (
    <div style={{ scrollMarginTop: '75px' }} id='projects'>
      <div className='flex flex-col gap-16'>
        {projects.map((project) => (
          <Card key={project.name}>
            <div className='relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0'>
              <Image src={project.logo} alt='' className='h-8 w-8' />
            </div>
            <h2 className='mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100'>
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className='relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200'>
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

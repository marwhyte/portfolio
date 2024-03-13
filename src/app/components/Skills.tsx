type SkillItemProps = {
  className?: string;
  src: string;
  alt: string;
  label: string;
};

const SkillItem = ({ className, src, alt, label }: SkillItemProps) => {
  return (
    <li
      className={`group/skillItem mx-8 flex flex-col items-center justify-center text-center ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className='h-12 transition-transform duration-300 ease-in-out group-hover/skillItem:scale-150'
      />
      <span className='text-md mt-6 text-gray-500 opacity-0 transition-opacity duration-300 ease-in-out group-hover/skillItem:opacity-100 dark:text-gray-200'>
        {label}
      </span>
    </li>
  );
};
type SkillsetProps = {
  ariaHidden?: boolean;
};

const Skillset = ({ ariaHidden }: SkillsetProps) => {
  return (
    <ul
      aria-hidden={ariaHidden ? 'true' : undefined}
      className='group-hover/skills:paused flex animate-infinite-scroll items-center justify-center py-10 md:justify-start [&_img]:max-w-none [&_li]:mx-8'
    >
      <SkillItem src='/graphql-logo.svg' alt='GraphQL Logo' label='GraphQL' />
      <SkillItem
        className='h-12 dark:drop-shadow-[0_0_8px_rgba(255,255,255,1)] dark:filter'
        src='/next-logo.svg'
        alt='Next Logo'
        label='Next.js'
      />
      <SkillItem src='/node-logo.svg' alt='Node Logo' label='Node.js' />
      <SkillItem
        src='/postgres-logo.svg'
        alt='Postgres Logo'
        label='Postgres'
      />
      <SkillItem src='/python-logo.svg' alt='Python Logo' label='Python' />
      <SkillItem src='/rails-logo.svg' alt='Rails Logo' label='Rails' />
      <SkillItem src='/react-logo.svg' alt='React Logo' label='React' />
      <SkillItem src='/ruby-logo.svg' alt='Ruby Logo' label='Ruby' />
      <SkillItem
        src='/snowflake-logo.svg'
        alt='Snowflake Logo'
        label='Snowflake'
      />
      <SkillItem
        src='/tailwind-logo.svg'
        alt='Tailwind Logo'
        label='Tailwind'
      />
      <SkillItem
        src='/typescript-logo.svg'
        alt='TypeScript Logo'
        label='TypeScript'
      />
      <SkillItem
        className='h-12 dark:drop-shadow-[0_0_12px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_4px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,1)] dark:filter'
        src='/vercel-logo.svg'
        alt='Vercel Logo'
        label='Vercel'
      />
    </ul>
  );
};

const Skills = () => {
  return (
    <div id='skills' style={{ scrollMarginTop: '75px' }}>
      <div className='text-center text-[15px] font-medium leading-8 tracking-wider text-gray-400'>
        I love learning new technologies, here are some that I use at the moment
      </div>
      <div className='group/skills inline-flex w-full flex-nowrap justify-start overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]'>
        <Skillset />
        <Skillset ariaHidden />
      </div>
    </div>
  );
};

export default Skills;

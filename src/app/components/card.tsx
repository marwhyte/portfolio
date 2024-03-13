import Link from 'next/link';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

function ChevronRightIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox='0 0 16 16' fill='none' aria-hidden='true' {...props}>
      <path
        d='M6.75 5.75 9.25 8l-2.5 2.25'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

const Card = <T extends ElementType = 'div'>({
  as,
  className,
  children,
}: Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
  as?: T;
  className?: string;
}) => {
  let Component = as ?? 'div';

  return (
    <Component
      className={clsx(className, 'group relative flex flex-col items-start')}
    >
      {children}
    </Component>
  );
};

Card.Link = function CardLink({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <>
      <div className='absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-gray-800/50  sm:-inset-x-6 sm:rounded-2xl' />
      <Link {...props}>
        <span className='absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl' />
        <span className='relative z-10'>{children}</span>
      </Link>
    </>
  );
};

Card.Title = function CardTitle<T extends ElementType = 'h2'>({
  as,
  href,
  children,
}: Omit<ComponentPropsWithoutRef<T>, 'as' | 'href'> & {
  as?: T;
  href?: string;
}) {
  let Component = as ?? 'h2';

  return (
    <Component className='text-base font-semibold tracking-tight text-gray-800 dark:text-gray-100'>
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

Card.Description = function CardDescription({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className='relative z-10 mt-2 text-sm text-gray-600 dark:text-gray-400'>
      {children}
    </p>
  );
};

Card.Cta = function CardCta({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden='true'
      className='relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500'
    >
      {children}
      <ChevronRightIcon className='ml-1 h-4 w-4 stroke-current' />
    </div>
  );
};

Card.Category = function CardCategory({ children }: { children: string }) {
  return (
    <span
      className={`relative z-10 rounded-full border ${children === 'Travel' ? 'border-orange-500' : 'border-indigo-400'} bg-transparent px-3 py-1 text-sm text-xs font-medium ${children === 'Travel' ? 'text-orange-500' : 'text-indigo-400'}`}
    >
      {children}
    </span>
  );
};

Card.Eyebrow = function CardEyebrow<T extends ElementType = 'p'>({
  as,
  decorate = false,
  className,
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<T>, 'as' | 'decorate'> & {
  as?: T;
  decorate?: boolean;
}) {
  let Component = as ?? 'p';

  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-gray-400 dark:text-gray-400',
        decorate && 'pl-3.5'
      )}
      {...props}
    >
      {decorate && (
        <span
          className='absolute inset-y-0 left-0 flex items-center'
          aria-hidden='true'
        >
          <span className='h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500' />
        </span>
      )}
      {children}
    </Component>
  );
};

export default Card;

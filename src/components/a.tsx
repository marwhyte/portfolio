import Link from 'next/link';

export function A({ children, className = '', href, ...props }: any) {
  if (href[0] === '#' || href[0] === '/') {
    return (
      <a
        href={href}
        className={`border-b border-gray-300 text-gray-600 transition-[border-color] hover:border-gray-600 dark:border-gray-500 dark:text-white dark:hover:border-white ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  } else {
    return (
      <Link
        href={href}
        className={`border-b border-gray-300 text-gray-600 transition-[border-color] hover:border-gray-600 dark:border-gray-500 dark:text-white dark:hover:border-white ${className}`}
        target='_blank'
        rel='noopener noreferrer'
        {...props}
      >
        {children}
      </Link>
    );
  }
}

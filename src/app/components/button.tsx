import Link from 'next/link';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

const variantStyles = {
  primary:
    'bg-gray-800 font-semibold text-gray-100 hover:bg-gray-700 active:bg-gray-800 active:text-gray-100/70 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-700 dark:active:text-gray-100/70',
  secondary:
    'bg-gray-50 font-medium text-gray-900 hover:bg-gray-100 active:bg-gray-100 active:text-gray-900/60 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:active:bg-gray-800/50 dark:active:text-gray-50/70',
  tertiary:
    'bg-transparent font-medium text-gray-800 hover:text-teal-500 dark:text-gray-300 dark:hover:text-teal-500',
};

type ButtonProps = {
  variant?: keyof typeof variantStyles;
} & (
  | (ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | ComponentPropsWithoutRef<typeof Link>
);

const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => {
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className
  );

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  );
};

export default Button;

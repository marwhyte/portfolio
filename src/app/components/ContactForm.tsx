'use client';

import { EnvelopeIcon } from '@heroicons/react/16/solid';
import { FormEvent } from 'react';
import { Button } from './Button';

const ContactForm = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const response = await fetch('/api/contact', {
        method: 'post',
        // @ts-ignore
        body: new URLSearchParams(data),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`Invalid response: ${response.status}`);
      }
      alert('Thanks for contacting us, we will get back to you soon!');
    } catch (err) {
      console.error(err);
      alert("We can't submit the form, try again later?");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40'
    >
      <h2 className='flex text-sm font-semibold text-zinc-900 dark:text-zinc-100'>
        <EnvelopeIcon className='h-6 w-6 flex-none' />
        <span className='ml-3'>Get in contact</span>
      </h2>
      <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
        Leave a message and I will get back to you as soon as possible.
      </p>
      <div className='mt-6 w-full'>
        <textarea
          name='message'
          placeholder='Message'
          aria-label='Message'
          required
          className='w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm'
        />
      </div>
      <div className='mt-2 flex'>
        <input
          name='email'
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
};

export default ContactForm;

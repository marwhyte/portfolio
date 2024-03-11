'use client';

import {
  CheckCircleIcon,
  EnvelopeIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';
import { FormEvent, Fragment, useState } from 'react';
import { Button } from './Button';
import { Transition } from '@headlessui/react';

const ContactForm = () => {
  const [emailSuccessToastOpen, setEmailSuccessToastOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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
      setEmailSuccessToastOpen(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert('');
      setLoading(false);
    }
  };
  return (
    <div style={{ scrollMarginTop: '75px' }} id='contact'>
      <div
        aria-live='assertive'
        className='pointer-events-none fixed inset-0 z-[100] flex items-end px-4 py-6 sm:items-start sm:p-6'
      >
        <div className='flex w-full flex-col items-center space-y-4 sm:items-end'>
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={emailSuccessToastOpen}
            as={Fragment}
            enter='transform ease-out duration-300 transition'
            enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
            enterTo='translate-y-0 opacity-100 sm:translate-x-0'
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='p-4'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <CheckCircleIcon
                      className='h-6 w-6 text-green-400'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='ml-3 w-0 flex-1 pt-0.5'>
                    <p className='text-sm font-medium text-gray-900'>
                      Email successfully sent!
                    </p>
                    <p className='mt-1 text-sm text-gray-500'>
                      I will get back to you as soon as possible.
                    </p>
                  </div>
                  <div className='ml-4 flex flex-shrink-0'>
                    <button
                      type='button'
                      className='inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      onClick={() => {
                        setEmailSuccessToastOpen(false);
                      }}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

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
          {loading ? (
            <div
              className='ml-4 flex w-[58.75px] items-center justify-center'
              role='status'
            >
              <svg
                aria-hidden='true'
                className='inline h-8 w-8 animate-spin fill-teal-500 text-gray-200 dark:text-gray-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          ) : (
            <Button type='submit' className='ml-4 flex-none'>
              Send
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

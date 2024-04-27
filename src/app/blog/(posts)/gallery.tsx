'use client';

import { PostData } from '@/lib/posts';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useState } from 'react';

const Modal = ({
  image,
  post,
  onClose,
}: {
  image?: string;
  post: PostData;
  onClose: () => void;
}) => {
  return (
    <Dialog
      static
      open={false}
      onClose={onClose}
      className='fixed inset-0 z-120 flex items-center justify-center'
    >
      <Dialog.Overlay
        key='backdrop'
        className='fixed inset-0 bg-white bg-opacity-75 transition-opacity dark:bg-gray-900'
      />
      <div className='z-100 flex items-center'>
        <img
          className=' h-70v lg:h-90v'
          src={`/${post.slug}/${image}`}
          alt='image'
        />
        <div className='absolute left-5 top-5 z-100 flex items-center gap-2 p-3 text-white'>
          <button
            onClick={() => onClose()}
            className='rounded-full bg-black/50 p-2 text-white/75 transition hover:bg-black/75 hover:text-white'
          >
            <XMarkIcon className='h-5 w-5 text-white' />
          </button>
        </div>
      </div>
    </Dialog>
  );
};

const Gallery = ({ posts }: { posts: PostData[] }) => {
  const segments = useSelectedLayoutSegments();

  const [selectedImage, setSelectedImage] = useState<string>('');

  const post = posts.find(
    (post) => post.slug === segments[segments.length - 1]
  );

  if (!post?.images.length) return <></>;

  return (
    <div className='mt-8'>
      <h2 className='mb-4'>
        <span className='inline-block bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent'>
          Gallery
        </span>
      </h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {post.images.map((image) => {
          return (
            <button
              key={image}
              onClick={() => setSelectedImage(image)}
              className='after:content after:shadow-highlight group relative mb-5 block flex w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg'
            >
              <Image
                className='transform rounded-lg brightness-100 transition will-change-auto group-hover:brightness-110'
                alt={image.split('.')[0].replaceAll('-', ' ')}
                src={`/${post.slug}/${image}`}
                width={500}
                height={500}
              />
            </button>
          );
        })}
      </div>
      {selectedImage && (
        <Modal
          onClose={() => setSelectedImage('')}
          image={selectedImage}
          post={post}
        />
      )}
    </div>
  );
};

export default Gallery;

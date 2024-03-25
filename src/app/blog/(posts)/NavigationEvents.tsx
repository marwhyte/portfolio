'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { createView } from '../serverActions';

const NavigationEvents = () => {
  const pathname = usePathname();

  useEffect(() => {
    const slug = pathname?.split('/').pop();

    if (slug) {
      createView(slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default NavigationEvents;

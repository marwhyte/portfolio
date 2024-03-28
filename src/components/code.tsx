'use client';

import hljs from 'highlight.js';
import { ReactNode, useEffect } from 'react';

export const Code = ({ children }: { children?: ReactNode }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <code
      className={`
      [p_&]:rounded-sm
      [p_&]:bg-gray-200
      [p_&]:px-1
      [p_&]:py-0.5
      [p_&]:text-sm
      dark:[p_&]:bg-[#333]
    `}
    >
      {children}
    </code>
  );
};

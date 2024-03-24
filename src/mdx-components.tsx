import type { MDXComponents } from 'mdx/types';

import { P as p } from './components/p';
import { H1 as h1 } from './components/h1';
import { H2 as h2 } from './components/h2';
import { H3 as h3 } from './components/h3';
import { OL as ol } from './components/ol';
import { UL as ul } from './components/ul';
import { LI as li } from './components/li';
import { HR as hr } from './components/hr';
import { Code as code } from './components/code';
import { Image } from './components/image';
import { Snippet } from './components/snippet';
import { Caption } from './components/caption';
import { Blockquote as blockquote } from './components/blockquote';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1,
    h2,
    h3,
    ol,
    ul,
    img: Image,
    li,
    hr,
    code,
    p,
    blockquote,
    Snippet,
    Caption,
  };
}

import { MDXRemote } from 'next-mdx-remote/rsc';
import { P as p } from './p';
import { H1 as h1 } from './h1';
import { H2 as h2 } from './h2';
import { H3 as h3 } from './h3';
import { OL as ol } from './ol';
import { UL as ul } from './ul';
import { LI as li } from './li';
import { HR as hr } from './hr';
import { Code as code } from './code';
import { Image } from './image';
import { Figure } from './figure';
import { Snippet } from './snippet';
import { Caption } from './caption';
import { Callout } from './callout';
import { Ref, FootNotes, FootNote } from './footnotes';
import { Blockquote as blockquote } from './blockquote';

export function PostBody({ children }: { children: string }) {
  return (
    <MDXRemote
      source={children}
      components={{
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
        Ref,
        FootNotes,
        FootNote,
        blockquote,
        Figure,
        Snippet,
        Caption,
        Callout,
      }}
    />
  );
}

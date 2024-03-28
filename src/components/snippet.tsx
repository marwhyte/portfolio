'use client';

import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // Theme choice

const CodeSnippet = ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre>
      <code className={language}>{code}</code>
    </pre>
  );
};

export default CodeSnippet;

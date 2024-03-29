<div align="center">
  <img alt="Logo" src="https://github.com/marwhyte/portfolio/assets/39717954/cb2546ab-7564-46b3-83a0-a6fa31ce544a" />
</div>
  <h1 align="center">
    marcowhyte.com
  </h1>
<p align="center">
  My portfolio website <a href="https://marcowhyte.com" target="_blank">marcowhyte.com</a>, build with <a href="https://nextjs.org/" target="_blank">Next.js</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwindcss</a>. It is deployed using <a href="https://vercel.com/" target="_blank">Vercel</a>.


## Getting Started Locally

If you do not have `pnpm` set up, install it:
```bash
npm i -g pnpm
```

Install dependencies:
```bash
pnpm i
```

In order for the contact section to work, create a `.env.local` file with the following env variables:
```
FROM_EMAIL=
POSTMARK_API_KEY=
SUPERFACE_API_KEY=
TO_EMAIL=
```

Then, run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

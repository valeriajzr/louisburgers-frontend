# LouisBurgers – Frontend (React + Next.js)

This is the **frontend** of the LouisBurgers system, built using **React**, **Next.js**, and **Tailwind CSS**. It provides a user interface to interact with the backend API, allowing users to view and manage burgers and orders.

The app uses the `app/` directory routing structure introduced in Next.js 13+, and is structured by feature-based routes (e.g., `/burgers`, `/orders`).

---

## Features

- View a list of available burgers and their details
- Create and edit burgers with dynamic ingredient selection
- Create and view customer orders
- Dynamic routing for entity editing (`/edit-burger/[id]`)
- Utility-first styling with Tailwind CSS

---

## Styling

This project uses **Tailwind CSS** for utility-first styling.  
You can customize the design using:

- `tailwind.config.js`
- `globals.css` (where Tailwind directives are imported)

---

## Related Projects

- Backend – ASP.NET Core API (https://github.com/valeriajzr/LouisBurgers)
- Database Scripts (https://github.com/valeriajzr/DBScripts)

---


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

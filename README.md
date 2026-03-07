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

### "Self-signed certificate in certificate chain" when running `vercel`

This usually happens when a proxy, firewall, or antivirus intercepts HTTPS. Options:

1. **Temporary workaround** (use only in a trusted environment): run once with TLS verification disabled:
   ```bash
   set NODE_TLS_REJECT_UNAUTHORIZED=0
   vercel login
   set NODE_TLS_REJECT_UNAUTHORIZED=
   ```
   Then deploy as usual (you can leave the variable unset after login).

2. **Proper fix** (Vercel): add your organization’s root CA certificate and set `NODE_EXTRA_CA_CERTS` to the path of a `.pem` file containing that CA, or disable SSL inspection for `vercel.com` in your proxy/antivirus if you have access.

### "Error connecting to database: fetch failed" (NeonDbError)

Same cause: HTTPS to the database is intercepted. For **local dev only**, run with TLS verification disabled:

- **PowerShell:** `$env:NODE_TLS_REJECT_UNAUTHORIZED="0"; npm run dev`
- **Or** add to `.env` (do not use in production): `NODE_TLS_REJECT_UNAUTHORIZED=0`

Once deployed on Vercel, the server runs in Vercel's network and usually does not need this.

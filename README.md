# Studio Sketchbook — Artist Portfolio

A dark-studio, sketchbook-themed portfolio for a portrait/line artist. Same
stack as the AI-engineer portfolio: Next.js (App Router), Tailwind, Framer
Motion, lucide-react, react-icons, and a working nodemailer contact form.

## What's inside

- Hero with a continuous-line eye illustration that draws itself on load
- Gallery of "pinned sketchbook pages" — swap the placeholder line-art SVGs
  in `app/page.tsx` (`works` array) for photos of real pieces
- A four-step process section, a materials list, testimonials, and a working
  contact form wired to `/api/contact`
- Four symmetric corner registration marks, fixed on every page

## Setup

```bash
npm install
```

Create `.env.local` at the project root:

```
GMAIL_USER=youraddress@gmail.com
GMAIL_APP_PASSWORD=yourapppassword
```

Use a 16-character Gmail **App Password** (not your normal password) —
generate one at https://myaccount.google.com/apppasswords after turning on
2-Step Verification. Paste it with no spaces.

Then update `DESTINATION_EMAIL` in `app/api/contact/route.ts` to wherever
commission inquiries should land (defaults to the address used earlier in
this project).

```bash
npm run dev
```

## Swapping in real artwork

Each entry in the `works` array in `app/page.tsx` currently draws an
abstract line-art placeholder via SVG paths. To use real photos instead,
replace the `<svg>` block inside `SketchCard` with a standard `<img>` or
Next.js `<Image>` pointing at your photographed piece, keeping the
surrounding torn-edge card and tape styling.

## Deploying

Same flow as before: push to GitHub, import the repo on Vercel, then add
`GMAIL_USER` and `GMAIL_APP_PASSWORD` under Project → Settings →
Environment Variables before your first production deploy.

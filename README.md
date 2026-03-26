# Fawad Liaqat Portfolio

A modular Next.js 15 portfolio website with static export deployment.

## Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

```bash
npm install
```

This installs dependencies. Run it once after cloning.

### Development

```bash
npm run dev
```

Starts the development server with Turbopack hot reload.
Open http://localhost:3000 in your browser.

### Production Build

```bash
npm run build
```

Outputs a static site to `out/` directory. 
Upload `out/` to any CDN or static host.

## Project Structure

```
.
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout + metadata
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── landing/           # Landing zone (ZoneA)
│   ├── portfolio/         # Portfolio zone (ZoneB)
│   └── ui/                # Shared primitives
├── data/                  # Content as TypeScript
│   ├── projects.ts        # All project entries
│   ├── research.ts        # Research papers
│   ├── signals.ts         # Signal strip metrics
│   └── site.ts            # Site config
├── hooks/                 # Custom React hooks
├── styles/                # CSS with custom properties
├── public/                # Static assets
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript config
├── package.json           # Dependencies
└── README.md              # This file
```



## Deployment

### Netlify (Recommended)
1. Connect GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `out`
4. Deploy

Netlify auto-reads `.netlify` configuration and `_headers` for security.

### Vercel
1. Import GitHub repo
2. Vercel auto-detects Next.js
3. Deploy

### Any Static Host
Upload the `out/` directory after running `npm run build`.

## Security

- **No external JavaScript**: Zero third-party JS. Only Google Fonts CSS.
- **No tracking**: No analytics, pixels, or telemetry.
- **Security headers**: CSP, HSTS, X-Frame-Options, etc. in `next.config.ts`.
- **Static export**: No server required.

## Troubleshooting

### `npm run dev` fails with "Missing script"
Make sure you're running from the project root (where `package.json` is), not a subdirectory.

### Port 3000 already in use
Run on a different port:
```bash
npm run dev -- -p 3001
```

### TypeScript errors
Ensure `node_modules` is up to date:
```bash
rm -rf node_modules
npm install
```



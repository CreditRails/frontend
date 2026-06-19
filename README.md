# CreditRails — Frontend

Landing page and user dashboard for CreditRails, a portable on-chain credit infrastructure built on Stellar.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Font:** Geist (via `next/font`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout, metadata, fonts
    page.tsx            # Landing page — composes all sections
    globals.css         # Tailwind imports + custom color tokens
  components/
    Navbar.tsx          # Fixed top nav with mobile menu
    Hero.tsx            # Hero section with gradient background
    HowItWorks.tsx      # 4-step explainer (white bg, bordered cards)
    Features.tsx        # Core infrastructure features (#F6F7F4 bg)
    Integrations.tsx    # Ecosystem integration cards
    CTA.tsx             # Bottom call-to-action with gradient card
    Footer.tsx          # Site footer with link columns
```

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| Brand purple | `#998DFF` | Primary buttons, highlights, icons |
| Brand light | `#F4F3FF` | Secondary buttons, icon backgrounds |
| Brand muted | `#A398FF` | Secondary button text |
| Hero gradient start | `#EFEFFF` | Hero section gradient |
| Hero gradient end | `#D7D2FF` | Hero section gradient, CTA card |
| Feature bg | `#F6F7F4` | Features and CTA section backgrounds |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

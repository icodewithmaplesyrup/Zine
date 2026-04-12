# Zine — App Shell

Mobile-first app built with **Expo Router** (React Native). Aged-paper zine aesthetic.

## Setup

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your phone or run on a simulator.

## Stack

| Layer | Choice |
|---|---|
| Framework | Expo SDK 52 + Expo Router |
| Language | TypeScript |
| Fonts | Special Elite (typewriter) + IBM Plex Mono |
| Backend (next step) | Supabase |
| AI Rating (next step) | Anthropic / OpenAI via Edge Functions |
| Payments (next step) | Stripe Connect |

## Folder Structure

```
app/
  _layout.tsx          # Root layout, font loading
  (tabs)/
    _layout.tsx        # Tab bar (custom zine aesthetic)
    index.tsx          # Home — joined zines
    create.tsx         # Create — publisher hub + monetization slider
    discover.tsx       # Discover — newsstand / explore
    profile.tsx        # Profile — settings, API key, AI credits
constants/
  theme.ts             # Colors, typography, spacing
components/
  ZineText.tsx         # Typed text component
```

## Design Tokens

All colors and fonts are in `constants/theme.ts`. The palette:

- `paper` `#F5EFE0` — aged newsprint base
- `ink` `#1C1A15` — near-black ink
- `red` `#C41E1E` — rubber stamp accent
- `yellow` `#E8C84A` — highlighter / tab active
- `blue` `#1A3A6B` — mimeograph blue (API / publisher)

## Next Steps

1. **Supabase** — wire up auth, `zines` and `articles` tables
2. **AI Rating Engine** — Node/Edge Function calling Anthropic API with vibe-matching prompt
3. **Flipbook Viewer** — `react-native-page-flip` or WebView + Turn.js for the published issue
4. **Stripe Connect** — publisher onboarding + application fee on subscriptions
5. **API Key Flow** — generate key on publisher creation, scope to `GET /v1/zines/:id`

## Prototype Builder Script

Use the script below to automatically assemble every tracked script file in the repository into a single prototype bundle for quick testing.

```bash
node scripts/build-prototype.mjs
```

Generated artifacts:

- `prototype/combined-prototype.tsx` — concatenated source in dependency-aware order
- `prototype/prototype-manifest.json` — metadata for what was included

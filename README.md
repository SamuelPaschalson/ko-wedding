# Nkiruka & Ositadinma — #OfficiallyKOd

Wedding site for 26 September 2026, Queen's Park Event Centre, Lagos.
React + Vite. No UI framework, two dependencies, builds in under two seconds.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

Deploy: push to Vercel or Netlify and point it at this folder. `vercel.json`
already rewrites everything to `index.html`. Routing is hash-based
(`/#/story`), so it also works on plain cPanel/Apache with no rewrite rules —
useful if it ends up on a shared host.

---

## How this one differs from the Jessica & Daniel site

| | J&D | K&O |
|---|---|---|
| Structure | one long scroll behind an envelope opener | nine routed pages, sticky nav |
| Palette | royal green, gold, peach | espresso, mocha, taupe, oat, ivory |
| Type | Great Vibes script + Cormorant | Prata + Pinyon Script (names) + Jost, Old Standard TT for the newspaper |
| Motif | falling petals, blurred photo backdrop | arch plates, paper grain, sepia photo grade |
| Story | short timeline | **The Sepia Chronicle** — a full broadsheet |
| Dropped | — | menu, hotel listings, asoebi page, gifts page (per your notes) |

The newspaper is deliberately the only loud thing on the site. Everything
else is quiet so it lands.

---

## Everything you edit lives in one file

`src/data/site.js`. Names, dates, venues, order of events, asoebi, bridal
party, FAQs, contacts, bank details, photo paths — all of it. Search the file
for `TODO:` and you will find every blank. There are about 30.

The important ones:

- **Church name and address** — `events[0]`
- **Queen's Park full address** and both Google Maps links — `events`
- **RSVP deadline and endpoint** — `rsvp`
- **Asoebi prices, coordinators, pick-up address** — `asoebi`
- **Bridal party names** — `bridalParty`
- **Bank details and registry links** — `gifts`
- **The story itself** — `story.columns`. Write it in your own voice; the
  three columns are how they met, the years between, and the proposal. Short
  and specific beats long and general. The newspaper handles the rest.

## Photos

Drop them into `public/images/` with the filenames listed in
`public/images/README.txt`. Any photo that is missing shows a warm mocha
panel instead of a broken image, so you can launch before the gallery is
ready and fill it in later.

## RSVP form

Two modes, no backend either way:

1. **Leave `rsvp.endpoint` empty** — the form opens WhatsApp with the
   completed RSVP pre-filled to `rsvp.whatsapp`. Zero setup.
2. **Paste a Formspree / Getform / Google Apps Script URL into
   `rsvp.endpoint`** — it POSTs JSON and shows a thank-you. Responses land in
   your inbox or a spreadsheet.

## Music

`public/song.mp3` is carried over from the previous build — swap it for
something of theirs. It never autoplays; the guest taps the button.

## Accessibility & performance

Keyboard focus rings, skip link, `aria-current` on the active page, ESC to
close the gallery lightbox, `prefers-reduced-motion` respected, images lazy
loaded. The whole JS bundle is ~57 KB gzipped.

---

## Notes for Nkiruka & Osita

- **Hero** is the ivory monogram treatment. You didn't have a couple photo yet,
  so nothing there pretends to be one. When your pre-wedding shots are ready,
  drop your favourite in as `public/images/hero.jpg` and set `plates.home`
  in `src/data/site.js` — it becomes the full-bleed background, names still
  readable.
- **Fonts are self-hosted** (via `@fontsource`), so the calligraphy renders even
  on networks that block Google Fonts. Couple names use Pinyon Script in both
  the hero and the footer; headings use Prata.
- **Bridal party** cards show the correct names on mocha panels. Add each
  person's photo with the filename in `public/images/README.txt`.
- **Removed** per your notes: the asoebi page (palette + dress code moved onto
  the landing page), the gifts page, and the parents' photos.
- **RSVP** posts to WhatsApp (Chidubem's number) until you paste a Formspree
  endpoint into `rsvp.endpoint`.

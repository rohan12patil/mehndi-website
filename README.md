# Trisha Heena & Mehndi — website

Static site. No build step, no dependencies.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page structure only — no copy lives here |
| `styles.css` | All styling (colours and fonts are CSS variables at the top) |
| `content.json` | **All website text, prices, areas, FAQs and images** — edit this |
| `site.js` | Renders `content.json` into the page and builds the WhatsApp links |
| `images/` | Drop her photos here |

## Editing the site

Almost everything is in `content.json`. Change the text, save, refresh.

- **Phone number** — `contact.whatsapp` (international format, no `+` or spaces: ``) and `contact.phoneDisplay`.
- **Instagram** — `contact.instagram`.
- **Prices** — `services.items[].price`.
- **Areas covered** — `coverage.areas`.
- **FAQs** — `faq.items`.
- **Pre-filled WhatsApp messages** — `whatsappMessages`. `{name}` is replaced with `contact.artistName`.

### Light and dark mode

The site opens in the visitor's device setting (light or dark). The sun/moon button in the header
switches it, and the choice is remembered on that device. All colours for both modes are the
tokens at the top of `styles.css`: dark values on `:root`, light values in the two blocks below it
(keep those two light blocks identical).

### Adding real photos

1. Put the images in `images/` (square-ish, ~1200px, compressed).
2. In `content.json`, set the `image` field on the gallery item:

```json
{ "label": "bridal hands — full", "image": "images/bridal-01.jpg", "tag": "BRIDAL" }
```

Leave `image` as `""` to keep the striped placeholder. `tag` must match one of `gallery.filters`.

## Running it locally

`content.json` is fetched, so opening `index.html` directly with `file://` will not work. Serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

**GitHub Pages** — push these files to a repo, then Settings → Pages → Source: `main` / root. Live at `https://<user>.github.io/<repo>/`.

Netlify, Cloudflare Pages and Vercel all work too: drag the folder in, no build command.

## Placeholder photography

The gallery and hero currently point at Creative Commons henna photos hosted on Wikimedia Commons
(see the `credit` field on each gallery item). They are there so the layout looks real — **they are
not Trisha's work and must be swapped for her own photos before the site is promoted.**

If you keep any of them, the CC BY-SA licence requires visible attribution (the footer credit line
covers this at a minimum). To replace one, drop a file in `images/` and change the item's
`image` value to `images/your-file.jpg`.

## Notes before going live

- Prices, the £25 deposit and the testimonials are **placeholders** — confirm real ones.
- Get public liability insurance before events and fairs; most venues require it.
- Set up a Google Business Profile for "mehndi artist Staffordshire" searches.

# photography

photographs by faiz mustansar, in a big two-up grid.

the site lives in `client/` and is an astro app.

## adding photos

drop images (jpg, png, webp, avif) into `client/src/photos/`. that's it.

- they're sorted by filename, so prefix them `01-`, `02-`, … to set the order.
- the caption comes from the filename: `03-toronto-harbour.jpg` → "toronto harbour".
- astro resizes and converts them to webp at build time, so full-size exports are fine.

click a photo to open it full screen. arrows, swipe, or esc to get around.

## run

```bash
cd client
npm install
npm run dev
```

build with `npm run build` from `client/`.

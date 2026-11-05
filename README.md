# Wake Div digital signage

One page drives all three screens. The end of the address picks the screen:

| Screen | Address |
|---|---|
| Rotunda lobby | `https://wfu-div.github.io/digitaldash/#rotunda` |
| Admissions lounge | `https://wfu-div.github.io/digitaldash/#admissions` |
| Lower Auditorium | `https://wfu-div.github.io/digitaldash/#auditorium` |

## Who changes what

- **Content** (slides, events, ticker, livestreams, settings): the **Wake Div Signage Content** Google Sheet. Screens pick up changes within about 2 minutes.
- **QR codes**: upload the QR Maker's SVG to `qr/` (see `qr/README.md`).
- **Background videos / photos**: upload to `media/` (see `media/README.md`).
- **Design and behavior**: `index.html`. Screens pick up a new version within the hour.

## Previewing

Add `?preview` to the address to unlock the preview keys:
← → step slides · 1 / 2 / 3 switch screens · **C** countdown · **G** 6-second countdown that goes live · **L** live stream on/off.

## Resilience

- The last good Sheet content and weather are saved on each screen, so an outage keeps showing recent content.
- The page itself is cached for offline use after its first load.
- Everything from the Sheet is shown as plain text (no HTML or scripts can run). Type `*word*` for gold italics.

This site is public but unlisted and not indexed. Never put private information (Zoom passcodes, private meetings) in the Sheet.

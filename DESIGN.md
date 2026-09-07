# Eighteen projects, eighteen identities

Each toy borrows its visual language from its own premise. Shared code in `assets/theme.css` and `assets/hub.js` supplies navigation, focus treatment, reduced-motion support, and utility functions. It should not prescribe project layouts, cards, typography, or backgrounds.

| Project | Direction | Signature colors | Composition and type |
| --- | --- | --- | --- |
| Goose Combat | Sports broadcast | Turf `#173d32`, jersey `#f9edb4`, amber `#eea339` | Condensed fixture headline beside the player and equipment lineup |
| Minor Misfortune | Carbon-copy service counter | Desk `#bcc6c7`, form `#f9f7e9`, copy `#f2dbe0` | Typed intake on the left; separately issued pink notice on the right |
| Talent Roster | Casting portfolio | Lilac `#eee9f2`, plum `#644473`, white `#faf8fc` | Oversized Italiana lettering, a portrait banner, and a light social sidebar |
| Cancellation Studio | Sunday cancellation club | Peach `#f4c7ae`, berry `#813d61`, shadow `#d6a18a` | Soft Bricolage lettering and a physical phone resting at an angle |
| Credential Judgment | Bench instrument | Enclosure `#e5e7df`, display `#291514`, LED `#ff9277` | Molded instrument body with specimen input and separate measurement windows |
| Reply-All Panic | Office mail client | Desktop `#668c8c`, chrome `#d4d0c8`, title bar `#003c78` | Tahoma, inset panes, beveled buttons, and native-looking notification dialogs |
| Spare Key | Architect's blueprint | Blueprint `#123b66`, chalk `#d9efff`, annotation `#ffc569` | A two-by-two plan with thin drawing lines and open mission annotations |
| Human Verification | Self-service airport kiosk | Concourse `#1544b2`, housing `#dce5f6`, screen `#f9fbff` | Large wayfinding text beside a molded white verification terminal |
| Inconvenience Store | Fluorescent corner shop | Sign `#1261a0`, awning `#e8392f`, stock label `#fff4a8` | Striped awning, oversized shop sign, and product shelves with price labels |
| Impossible Lots | Private auction house | Oxblood `#521b30`, gold `#dbc69e`, gallery `#faf7f3` | Playfair display, generous lot illustrations, two-column acquisitions catalog |
| Cookie Consent | Botanical shop interrupted | Leaf `#275d47`, mist `#e7efe6`, vendor white `#ffffff` | Tea packaging and a full-width vendor consent sheet covering the bottom |
| Containment Button | Emergency stop station | Casing `#f3bd22`, switch `#d8261c`, hardware `#24231d` | Yellow equipment wall dominated by a circular mushroom switch |
| Decoy Update | Managed workstation recovery | Screen `#20252c`, rail `#4c5665`, progress `#8bbcff` | Restrained system type, small progress rail, and a separate explanatory section |
| Defeatist Dino | Pocket LCD game | Shell `#ede7de`, LCD `#ced9a1`, room `#c7a0ba` | Pixel playfield inside a handheld enclosure with an asymmetric lower corner |
| DVD Engine | Living-room television | Tube `#160f23`, bezel `#49414f`, OSD `#c6c0ff` | Full-screen bouncing logo inside a rounded bezel; compact corner readouts |
| Is It Level? | Blue exhibition room | Wall `#183a5a`, frame `#c6a06b`, caption `#f1e6cc` | Spotlighted warm painting, side caption, and a separate control plinth |
| Helpful Editor | School exercise book | Desk `#7d94b3`, paper `#fffef8`, margin `#e6a6ae` | Newsreader on blue rules with a red correction margin |
| Action Search | Summer blockbuster | Shadow `#11293d`, title `#f8dfbb`, explosion `#e76726` | Anton movie typography above a single input, framed by recording mattes |

## Keeping them distinct

- Preserve the signature composition as well as the palette. Recoloring a shared card layout will recreate the original problem.
- Keep game IDs, state classes, and event handlers intact when changing presentation.
- Scope utility overrides to the actual component; avoid substring matches that also match hover classes.
- Check both the initial view and active states at desktop and phone widths. Moving overlays and generated content need their own checks.
- The hub uses real page screenshots in `assets/previews/`. Refresh the corresponding WebP when a project's visual identity changes; use a 1440 × 1000 desktop capture resized to 720 × 500.

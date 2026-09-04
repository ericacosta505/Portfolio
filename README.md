# Eric Acosta — Portfolio

A personal, editorial portfolio for software engineer Eric Acosta. Built with plain HTML, CSS, and browser JavaScript. All site files live in `public/`; there are no application server dependencies or build steps.

## Design

Inspired by The Browser Company’s spacious layouts, expressive serif typography, and small interactive details. The Austin clock, project miniatures, and personal writing make it Eric’s own, with consistent typography and spacing across every page.

- Home, Work, About, Contact, and custom 404 pages
- Day and night themes, with a saved preference
- Selected project previews with mouse, touch, and keyboard navigation
- Direct project links: `/work.html#project-0` through `#project-2`
- Responsive layouts, visible keyboard focus, and reduced-motion support
- Complete project content remains available without JavaScript

## Local preview

With Python 3 installed, run this from the repository root:

```bash
python3 -m http.server 4000 --bind 127.0.0.1 --directory public
```

Open <http://127.0.0.1:4000>. Stop the preview with `Ctrl+C`.

This command is only a local preview tool; Python is not required by the deployed site. Use an HTTP preview because asset URLs start at `/`. To preview the custom error page, visit `/404.html`; Python's built-in server uses its own error page for missing URLs.

## Deployment

The live site at <https://ericacosta.dev> is hosted by the `Portfolio-static` Render Static Site, connected to the `main` branch of this repository.

- Build command: `echo "No build required"`
- Publish directory: `public`
- Root directory: leave blank
- Preview URL: <https://portfolio-static-utnu.onrender.com>

Render serves the files directly, handles HTTPS and caching, and uses `public/404.html` for missing pages. The `www` domain redirects to <https://ericacosta.dev>.

The following HTTP headers are configured in the Render dashboard for `/*`:

| Header | Value |
| --- | --- |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

The former `Portfolio` Node web service is retired from production. These repository files no longer support its `npm` install/start workflow.

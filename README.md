# Eric Acosta — Portfolio

A personal, editorial portfolio for software engineer Eric Acosta. Built with HTML, CSS, JavaScript, and a minimal Express static server.

## Design

Inspired by The Browser Company’s spacious layouts, expressive serif typography, and small interactive details. The Austin clock, project miniatures, and personal writing make it Eric’s own, with consistent typography and spacing across every page.

- Home, Work, About, Contact, and custom 404 pages
- Day and night themes, with a saved preference
- Selected project previews with mouse, touch, and keyboard navigation
- Direct project links: `/work.html#project-0` through `#project-2`
- Responsive layouts, visible keyboard focus, and reduced-motion support
- Complete project content remains available without JavaScript

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:4000`. The server also accepts a `PORT` environment variable.

HTML, CSS, and JavaScript responses revalidate on each visit so cached page code stays in sync.

There is no framework or build step. Files in `public/` are served directly. Deploy that directory through your existing hosting setup.

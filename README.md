# Follow-Up Board

ScaleDaycares six-branch sales follow-up and appointment-confirmation architecture.

- `sequence.json` is the single source of truth for branch definitions, cadences, routes, and global rules.
- `build.mjs` generates both published views from that source.
- `index.html` is the self-contained zoomable visual board. Its data is embedded so the page works without a server.
- `sequence.md` is the readable text version.

## Build

Run:

```sh
node build.mjs
node verify.mjs
```

Commit `sequence.json`, `sequence.md`, and `index.html` together after rebuilding.

No lead names or contact data belong in this repository.

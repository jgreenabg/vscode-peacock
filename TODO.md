# Peacock Modernization TODO

**Completed:** 2026-04-08

- [x] **Phase 0** — Scaffold TODO.md and CHANGELOG.md
- [x] **Phase 1** — Rebaseline manifest and tooling
- [x] **Phase 2** — Runtime hygiene
- [x] **Phase 3** — Remove Live Share (merged into Phase 1)
- [x] **Phase 4** — Refresh theme tokens
- [x] **Phase 5** — Rebuild tests and CI

## Follow-ups

Stale references to removed functionality discovered during docs sync. These are code/config changes (separate commit):

- `.gitignore:10` — `.vscode-test-web` ignore entry; web target was removed
- `.vscodeignore:28` — `.eslintrc` ignore entry; file no longer exists (harmless)
- `e2e/homepage.spec.ts:40` — Asserts "Live Share" feature bullet on docs site
- `e2e/images.spec.ts:56` — Expects `peacock-live-share-demo` image on docs site
- `docs/README.md:11` — Live Share feature bullet
- `docs/about/history.md:3` — "Visual Studio Live Share" in tagline
- `docs/guide/README.md:5,41,69-70,185-200,394` — Live Share integration section, settings, badge

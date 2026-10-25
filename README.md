# Jay Jathar — Portfolio

Next.js (App Router, TypeScript) static site, deployed to GitHub Pages. UI inspired by n8n Cloud and CRED: dark workflow canvas, bold type, spotlight cards.

All content lives in [`data/profile.ts`](data/profile.ts) — edit it and the site updates.

## Develop

```bash
npm install
cp .env.example .env.local   # optional locally
npm run dev                  # http://localhost:3000
npm run build                # static export to ./out
```

## Contact form (email on submit)

GitHub Pages is static, so there is no server or database. The form posts directly from the browser to [Web3Forms](https://web3forms.com), which emails each message to the address registered with your access key.

1. Create a free access key at web3forms.com using `jayjatharjj@gmail.com`.
2. In the Web3Forms dashboard, restrict allowed domains to your Pages domain (the key is public by design).
3. Locally: set `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local`.
4. In GitHub: **Settings → Secrets and variables → Actions → New repository secret** named `NEXT_PUBLIC_WEB3FORMS_KEY`.

Without a key the contact section falls back to a plain `mailto:` button.

## Deploy to GitHub Pages

1. Push this repo to `github.com/jayjatharjj/Portfolio` (branch `main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds with `NEXT_PUBLIC_BASE_PATH=/<repo name>` and publishes `out/`.
   Site URL: `https://jayjatharjj.github.io/Portfolio/`.

If you rename the repository, update `NEXT_PUBLIC_BASE_PATH` in the workflow (or use `/` for a `<user>.github.io` repo).

## Résumé download

Put a PDF in `public/` (e.g. `public/resume.pdf`) and set `resume: "resume.pdf"` in `data/profile.ts` to show the download button. `*.docx` files are git-ignored because they contain a phone number.

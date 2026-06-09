# Client Download Gate

This Cloudflare Worker keeps Mega download links out of the public GitHub repo.

## How Nathan Works

1. The client enters the access code on `/client-gallery/`.
2. GitHub Pages loads `client-galleries/folder-name/name.json` for previews.
3. Because that manifest has `"downloadGate": true`, the page asks this Worker for download links.
4. The Worker checks the session id and access code.
5. If valid, it returns the private Mega links for the download cards.

## Cloudflare Setup

Create a Worker, paste `cloudflare-worker.js`, then add these Worker variables/secrets:

```text
ALLOWED_ORIGIN=https://pekadi.com,https://website-45p.pages.dev
NAME_ACCESS_CODE=
NAME_EDITED_MEGA_URL=https://mega.nz/folder/your-folder#your-key
NAME_RAW_MEGA_URL=https://mega.nz/folder/your-folder#your-key
```

Use Cloudflare secrets for the access code and Mega URLs.

After deploying, copy the Worker URL and set it in `client-gallery/index.html`:

```js
const DOWNLOAD_GATE_ENDPOINT = "https://your-worker.your-subdomain.workers.dev";
```

Do not commit real Mega URLs with keys to this repo.

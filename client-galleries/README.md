# Client Gallery Upload Pattern

Use one folder per photoshoot session.

Example:

```text
client-galleries/folder-name/
  cover.jpg
  NAME.json
  edited-full-quality.zip
  raw-originals.zip
  previews/
    photo-001.jpg
    photo-002.jpg
```

Add the session folder to `CLIENT_SESSIONS` in `client-gallery/index.html`, then copy `manifest-template.json` into the session folder and rename it to the access code you want the client to use.

Keep preview JPGs small. If the full-quality files use a Mega share link or any URL with a private key, do not commit that URL to this repo. Leave the manifest `href` empty and share the link directly with the client, inject it only in a private deploy step, or use the private download gate in `download-gate/`.

For download-gated sessions, keep the public manifest limited to labels and previews:

```json
{
  "downloadGate": true,
  "downloads": [
    {
      "label": "Download Edited Photos",
      "detail": "Private download unlocks with your access code",
      "downloadId": "edited"
    }
  ]
}
```

Add matching download gate secrets for each private session, such as `NAME_ACCESS_CODE`, `NAME_EDITED_MEGA_URL`, and `NAME_RAW_MEGA_URL`.

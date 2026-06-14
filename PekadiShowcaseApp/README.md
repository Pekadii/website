# Pekadi Showcase App

This is a small native iOS shell for `https://pekadi.com`.

The app uses SwiftUI and `WKWebView`, so website updates still come from the normal GitHub to Cloudflare Pages deploy flow. Push site changes to GitHub, Cloudflare publishes them, and this app loads the latest live site.

Before TestFlight or App Store submission:

- Set `DEVELOPMENT_TEAM` in Xcode.
- Change `PRODUCT_BUNDLE_IDENTIFIER` from `com.pekadi.showcase` if you want a different bundle ID.
- Confirm the app name, icon, and native toolbar behavior.
- Consider adding at least one client-useful native feature before App Store review, such as saved portfolio pages, offline favorites, or a native booking shortcut.

Verified with:

```sh
DEVELOPER_DIR=/Volumes/1TB/Applications/Xcode.app/Contents/Developer xcodebuild -project 'PekadiShowcaseApp/PekadiShowcase.xcodeproj' -scheme PekadiShowcase -destination 'generic/platform=iOS' -derivedDataPath /tmp/pekadi-showcase-derived-device CODE_SIGNING_ALLOWED=NO build
```

# Home Session — The Reds (PWA)

Installable, offline soccer ball-mastery trainer. One shared URL; each person installs it
to their own device and it works with no signal after the first load. Every user's progress
is stored locally on their device — independent, no accounts.

## Deploy (pick one)

### A) Fastest — Vercel CLI, no GitHub
    npm i -g vercel
    cd mufc-united-pwa
    vercel --prod        # follow prompts; copy the URL it prints

### B) GitHub + Vercel (recommended for ongoing edits)
    cd mufc-united-pwa
    git init && git add . && git commit -m "Reds home-session PWA"
    gh repo create reds-home-session --public --source=. --push   # GitHub CLI
Then in Vercel: New Project -> import `reds-home-session` -> Deploy. No build settings;
it's a static site. Every future `git push` auto-deploys.

## Share + install (send friends the Vercel URL)
- iPhone/iPad: open in Safari -> Share -> Add to Home Screen.
- Android: open in Chrome -> Install app (or menu -> Add to Home screen).
- After that it launches full-screen and runs offline.

## Update the drills later
Replace files, then `git push` (option B) or re-run `vercel --prod` (option A).
Bump the CACHE name in `sw.js` (e.g. "reds-v2") whenever you change clips so devices
pull the new version.

## Want shared progress across the friend group?
This version keeps progress per-device. A shared leaderboard / per-kid accounts would use
Supabase (auth + a small table). Ask and it can be added without changing the UI.

## Branding note
The emblem is an original, United-flavored mark — not the club's trademarked crest.
Colors, jersey-number styling, and copy nod to the club; no official logos are reproduced.

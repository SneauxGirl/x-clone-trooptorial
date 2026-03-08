# X Clone Trooptorial

A full-stack X (formerly Twitter) clone built with Next.js, TypeScript, Firebase, and SCSS. Based on the original tutorial by [@thehashton](https://github.com/thehashton/x-clone), with significant feature additions and UI updates.

🔗 **Live Demo:** [x-clone-trooptorial.vercel.app](https://x-clone-trooptorial.vercel.app)

---

## About

This project started as a follow-along tutorial clone of X's 2024 UI. The original tutorial used Firebase Authentication to manage login state, and this implementation expands that — tying auth to Firestore user profiles, using the logged-in user's ID to attribute tweets, and restricting delete access so users can only remove their own posts.

---

## Features

### Authentication
- Email/password signup and login via Firebase Auth
- Auth-protected routes — unauthenticated users are redirected to login
- Sign out with toast confirmation

### User Profiles
- User data (full name, username, photo) stored in Firestore
- Profile photos ramdomly auto-assigned to avoid storage fees but keep it fun
- Username capped at 15 characters on signup, as per X policies
- Profile displayed in sidebar mini-profile with sign out menu

### Tweets
- Post tweets with a 280-character limit and live countdown counter
- Emoji picker for tweet composition
- Tweets fetch author data (name, handle, photo) from Firestore at load time
- New tweets immediately display with the logged-in user's profile data
- Delete tweets — only the tweet's author can see and use the delete option
- Engagement counts (comments, retweets, likes) stored and updated in Firestore

### UI Details
- Like button toggles between liked/unliked state with +1/-1 count
- Comment and repost buttons increment their respective counts
- Engagement counts reflect real Firestore data with a randomized boost on load
- Engagement view count increments on every interaction
- Responsive layout with SCSS modules

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Auth & Database:** Firebase Authentication + Firestore
- **Styling:** SCSS Modules
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites
- Node.js
- A Firebase project with Authentication and Firestore enabled

### Installation

```bash
git clone https://github.com/SneauxGirl/x-clone-trooptorial.git
cd x-clone-trooptorial
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Run Locally

```bash
npm run dev
```

---

## Original Tutorial

Based on [X Clone by @thehashton](https://github.com/thehashton/x-clone).

Notable additions beyond the original:
- Full Firestore user profile integration
- Username-based login
- Per-user tweet ownership and delete permissions
- Profile photos provided on signup
- Emoji picker
- 280 character limit with live counter
- Additional randomized engagement counts with interactive updates

---

### Not Yet Implemented (PRs Welcome)

- Retweet functionality
- Reply threads
- Follow/unfollow users
- Profile pages
- Update login and sidebar to match current X styling
- Build out sidebar features (after update)

---

## Author

Built by [@SneauxGirl](https://github.com/SneauxGirl)
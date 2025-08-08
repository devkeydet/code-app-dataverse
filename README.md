# Code App Dataverse (React + Vite)

Power Platform “code app” built with React + TypeScript + Vite and Fluent UI v9. It integrates with:

- Dataverse tables (contacts, accounts)
- Office 365 Users connector (profile/photo)

Includes a Debug page to surface runtime status and raw service results.

## Prerequisites

- Node.js LTS (v18+ recommended)
- Power Platform CLI (pac)
- Optional: Power Platform Tools for VS Code

## Get started

1. Install dependencies (use legacy peer deps to avoid conflicts):

```powershell
npm install --legacy-peer-deps
```

1. Sign in to Power Platform (if not already):

```powershell
pac auth who
# or
pac auth create
```

1. Run locally (starts the Local Player runtime and Vite dev server):

```powershell
npm run dev
```

## Build

```powershell
npm run build
```

## Troubleshooting

- Install issues: always use `npm install --legacy-peer-deps` in this repo.

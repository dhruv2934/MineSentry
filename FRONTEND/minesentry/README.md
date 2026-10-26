# MineSentry Frontend Prototype

MineSentry is an industrial governance, safety, compliance, and risk-intelligence platform engineered for coal mining operations.

---

## 🏗️ Architecture Overview

The frontend is built with:
- **React 19 + TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (Dark industrial theme with coal palette `#080a0c`, `#12161a`, and amber `#f59e0b` accents)
- **React Router DOM v7** (Full client-side SPA routing with persistent enterprise sidebar shell)
- **Lucide React** (Industrial iconography)

```
components/pages
       ↓
     hooks
       ↓
   services (Promise.resolve)  <-- Ready for future API switch!
       ↓
   mock data
```

---

## 🎬 1. Public Landing & Video/Image Replacement

All customizable visual assets are kept in one centralized location:

```
public/assets/
├── videos/
│   └── minesentry-hero.mp4      <-- Replace with your local mining video!
├── images/
│   ├── mine-truck.jpg           <-- Replace with your haul truck photo
│   ├── mine-pit-login.jpg       <-- Open-pit background
│   └── mines/                   <-- Mine facility photos (jharia.jpg, korba.jpg, etc.)
└── logo/
    ├── minesentry-logo.svg      <-- Full brand wordmark
    └── minesentry-mark.svg      <-- Shield mark icon
```

### Central Asset Registry
To change paths without editing individual UI components, edit:
[`src/config/assets.ts`](file:///C:/Users/dhruv/.gemini/antigravity/scratch/minesentry/src/config/assets.ts)

### Hero Animation Features:
1. **Background Layer**: Local video (`minesentry-hero.mp4`) with smooth image poster fallback (`mine-truck.jpg`).
2. **Cinematic Title Emergence**: The title **MineSentry** emerges from below and behind the foreground haul truck, rising smoothly into full view with depth layering.
3. **Frosted Glass Login Card**: Smoothly enters on the right side with backdrop blur. Any valid credentials grant access to `/dashboard`.

---

## 🔌 2. Future Backend API Integration

No backend APIs are called yet. All application data flows through async service functions:

```ts
// Currently in src/services/mineService.ts:
async getMines(): Promise<Mine[]> {
  await delay();
  return Promise.resolve([...mockMines]);
}

// In the future, simply replace with:
async getMines(): Promise<Mine[]> {
  const response = await api.get<Mine[]>('/mines');
  return response.data;
}
```

The pages and components use custom React hooks (`useMines`, `useInspections`, `useViolations`, etc.) and do **not** directly import mock arrays, so the backend transition requires **zero UI rewrites**.

### Schema Alignment
Fields adhere strictly to backend naming conventions:
- `mine_id` (not `mineId`)
- `inspection_date` (not `inspectionDate`)
- `created_at`, `updated_at`
- Core fields: `id`, `name`, `code`, `location`, `state`, `district`, `description`, `status`
- Extended view-model fields: `image_url`, `production`, `risk_score`, `risk_level`, `open_items`, `compliance_score`, `active_inspections`, `open_violations`, `open_corrective_actions`.

---

## 🧭 3. Application Routes

| Route | View | Description |
|---|---|---|
| `/` or `/login` | Public Landing | Fullscreen video hero, cinematic title animation, frosted login card |
| `/dashboard` | Command Center | Portfolio KPI cards, production trends, compliance health, activity feed |
| `/mines` | Mine Sites | Two large photographic cards per row with hover depth and key metrics |
| `/mines/:mineId` | Mine Dossier | Hero banner, seam depth, methane grade, and progressive disclosure tabs |
| `/inspections` | Inspections | Summary tiles, filters (mine/status/type), data table, schedule modal |
| `/inspections/:id` | Inspection Detail | Comprehensive audit scope, inspector sign-offs, linked findings |
| `/observations` | Field Observations | Mobile observations processed by LangGraph RAG with confidence scores |
| `/observations/:id` | Observation Detail | Matched CMR 2017 clauses with cosine similarity scores |
| `/violations` | Statutory Violations | Legal risk exposure, DGMS show-cause penalties, remediation due dates |
| `/violations/:id` | Violation Detail | Statutory clauses and linked corrective actions |
| `/corrective-actions` | Corrective Actions | AI recommendations with interactive "Authorize" / "Reject" workflow |
| `/corrective-actions/:id`| Action Detail | Engineering specifications and authorization trail |
| `/regulations` | Regulatory Codex | Searchable repository of Coal Mines Regulations 2017 & DGMS rules |
| `/compliance` | Compliance | Statutory scorecard and mine-by-mine compliance ratings |
| `/risk` | Risk & Recurrence | Geotechnical strata & ventilation gas risk matrix |
| `/analytics` | Analytics | LTIFR benchmarks, near-miss rates, and facility rankings |
| `/workforce` | Workforce | Shift muster rolls, welfare index, and safety grievances |
| `/users`, `/audit-logs` | Admin | Role-based permissions and immutable audit logs |

---

## 🚀 Running the Project

```bash
cd C:\Users\dhruv\.gemini\antigravity\scratch\minesentry
npm run dev
```

Open `http://localhost:5173` in your browser.

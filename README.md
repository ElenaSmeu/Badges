### 2h task: Angular mini‑app that loads and displays assets from a JSON file

### Goal

Build a tiny Angular app that fetches a JSON file from `assets/`, validates it, caches it in a service, and displays it with basic UX states (loading, error, empty, list, search).

### Requirements

- **Project**: New Angular standalone app (Angular 17+). Use `HttpClient`.
- **Data**: Place `assets/achievementsCatalog.json` in the app; load via GET.
- **Types + validation**:
  - **Asset type**: `id`, `name`, `description`, `image`, `timesUnlocked`, `level`, `lastUnlocked`.
  - **Validation**: Validate incoming data; if invalid, surface a “data format error”.
- **Service: `AssignmentService`**
  - `getAssignments(): Observable<Assignment[]>` — returns data if present.
  - Handle and categorize errors: network vs validation.
- **UI**
  - Show loading indicator while fetching.
  - Error state with message and a Retry button.
  - Empty state if no assets.
  - List view with:
    - Search by name.
    - Filter by `type` (dropdown).
    - Thumbnail (fallback if missing).
- **Testing**
  - Unit test for `AssignmentService`: loads JSON.
  - Unit test for component: renders items and applies search filter.

### Deliverables

- `assets/assets.json`
- `src/app/asset.service.ts`
- `src/app/asset-list.component.ts` (standalone)
- Minimal routing or single root component hosting the list
- 2–3 focused unit tests (service + component)

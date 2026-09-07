Alright, let's kick this off properly. Since this is our first project together, I'm starting you at a baseline that'll surface where your real gaps are — not too trivial, not a trap.

## Project: **Internal Issue Tracker API — "Tracker Lite"**

A scoped-down Jira/Linear clone. This is for an internal team that wants to log bugs/tasks, assign them, and track status — nothing fancier than that. You'll build the backend first; frontend comes once the API is solid (I don't want you gluing React onto shifting endpoints).

### Functional Requirements

1. Users can be created and authenticated (email + password, hashed — no plaintext, no rolling your own crypto, use `bcrypt`).
2. Authenticated users can create "issues" with: title, description, status (`open`, `in_progress`, `closed`), priority (`low`, `medium`, `high`), and an optional assignee (another user).
3. Users can list issues with filtering by status, priority, and assignee (query params).
4. Users can update an issue's status/priority/assignee/description — but only the creator or the assignee can edit it (everyone else gets a 403).
5. Users can delete issues — creator only.
6. Issues support comments (create + list, no edit/delete needed yet) — a comment belongs to a user and an issue.
7. Pagination on the issue list endpoint (don't return the whole table forever).

### Non-Functional Requirements

- Passwords never appear in any response payload or log line, ever.
- Auth via JWT, reasonable expiry (you decide, but justify it in the README).
- All list/read endpoints respond in under 200ms locally against a seeded dataset of ~500 issues.
- Input validation on every mutating endpoint (Zod or Joi — your call) with meaningful 400 error bodies, not stack traces.
- Centralized error-handling middleware — no scattered `try/catch` with duplicated error-shaping logic in every route.

### Acceptance Criteria

- [ ] Can register, log in, and receive a JWT
- [ ] Can create/read/update/delete issues per the permission rules above
- [ ] Can create and list comments on an issue
- [ ] Filtering and pagination work correctly and are covered by tests
- [ ] Unauthorized edit/delete attempts return 403, not 500 or silent success
- [ ] Invalid payloads return 400 with a useful message
- [ ] No secrets committed — `.env` used and gitignored

### Definition of Done

- Tests passing (Jest + Supertest) covering: auth flow, permission logic (the 403 cases especially — that's where bugs hide), and validation failures
- No linter errors (set up ESLint even if you don't have opinions yet on the config — pick a reasonable base like `airbnb-base` or `standard`)
- README with setup instructions, a note on your JWT expiry choice, and how to seed the 500-issue dataset for perf testing
- Proper structure: routes → controllers → services, not business logic sitting in route handlers

### Stretch Goals (optional)

- Rate limiting on the auth endpoints
- OpenAPI/Swagger doc for the API

---

**One judgment call I'm flagging up front:** no Neo4j here — issues, users, and comments are relational/tabular (foreign keys, not graph traversals), so a graph DB would be over-engineering. Use Postgres or even SQLite for now unless you have a strong reason to want something else — tell me if so.

Ping me when you've got a working slice (even just auth + issue CRUD, comments can lag) and I'll review before you go further — I don't want you building all of this blind and finding out about a structural problem on file #12.
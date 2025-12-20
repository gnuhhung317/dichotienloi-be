# dichotienloi-be

Backend scaffold for Dichotienloi.

Quickstart

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Install dependencies: `npm install`
3. Generate Prisma client: `npm run prisma:generate`
4. Run migrations: `npm run prisma:migrate`
5. Start dev server: `npm run dev` (uses `ts-node-dev`)

Project layout

server/
├── prisma/ (Prisma schema)
├── src/
│   ├── config/ (DB + env)
│   ├── modules/ (feature modules: auth, group, fridge...)
│   └── app.ts

Notes

- Schema is based on `database.uml`. Adjust types or relations where needed.
- Modules are placeholders. Implement routes, controllers, services, and tests per module.
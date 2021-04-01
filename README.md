# Notes dashboard

A very simple markdown post-it dashboard.

Made with React + Webpack + Koa + Knex + Objection ORM

## Installing

```bash
git clone https://github.com/cristianchelu/notes-dashboard.git
cd notes-dashboard
npm install
```

## Running
```bash
# Development ( http://localhost:3000/ )
npm run dev:db
npm run dev

# Production
npm run build
NODE_ENV=production node src/server/index.js
```
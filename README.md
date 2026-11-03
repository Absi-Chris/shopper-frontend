# Curate — Personal Shopper AI Frontend

React + TypeScript + Vite frontend for the FastAPI Personal Shopper AI backend.

## Start

1. Start the FastAPI backend on `http://127.0.0.1:8000` and seed products.
2. Run:

```bash
npm install
npm run dev
```

3. Open `http://localhost:5173`.

Vite proxies `/api` to FastAPI so no backend CORS change is needed during local development. For separate deployment, set `VITE_API_BASE` to your API URL and configure FastAPI CORS accordingly.

## Features

- Catalog search and category filters from SQLite-backed `/products`.
- Shopping bag: add, remove, totals, and stock errors.
- AI chat with conversation `session_id` and tool-driven product comparisons and cart management.
- Upload PDF, TXT, or MD for RAG.
- Responsive layout with mobile support.

## Limitations

- Product illustrations are category icons because the backend does not expose product image URLs.
- The backend's `X-User-Id` header is a **demo identity**, not real authentication. Do not deploy publicly without JWT/OAuth and protected product/document upload endpoints.
- Checkout is not implemented by the backend; the bag offers an AI review instead.
- Chat history is retained by the backend, but the frontend's current session is kept only in React state and resets on page reload.

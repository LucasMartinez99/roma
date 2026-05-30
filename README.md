# 🎥 Movies Admin

A React + Vite frontend application that consumes a **REST API protected with OAuth2**. Built as a technical assessment, it demonstrates authentication with PKCE, full CRUD operations, and paginated data management.

---

## ✅ Features

### 🔐 OAuth2 Authentication (with PKCE)
- Login implemented manually with `fetch` — no third-party auth libraries
- Full PKCE implementation with `code_verifier` and `code_challenge`
- `access_token` and `refresh_token` stored and managed in `localStorage`
- Automatic token verification and silent refresh via `refresh_token`
- Route protection via `ProtectedRoute` component

### 🎬 Movies CRUD
- Paginated movie listing connected to the real API
- Create, edit, and delete via modal form
- Associations with existing studios and producers
- Confirmation dialog before deletion

### 🎨 UI
- Bootstrap 5 — responsive across mobile and desktop
- SweetAlert2 for user feedback and dialogs
- Loading indicators on login

---

## 🚀 Tech Stack

- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## 📂 Project structure

```
roma-project/
├── public/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── Login.module.css
│   │   └── images/
│   │       └── image.png
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── CallbackPage.jsx
│   │   ├── MoviesPage.jsx
│   │   └── MovieForm.jsx
│   ├── services/
│   │   ├── authService.js
│   │   ├── movieService.js
│   │   ├── pkce.js
│   │   └── secureFetch.js
│   ├── ProtectedRoute.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🛠️ Local setup

```bash
# 1. Clone the repository
git clone https://github.com/LucasMartinez99/roma.git
cd roma

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Make sure your browser allows redirects from `http://localhost:3000/callback`.

---

## 🧠 Concepts applied

- Client-API architecture (frontend consuming external endpoints)
- OAuth2 with PKCE — implemented from scratch without libraries
- Token lifecycle management (`access_token` + `refresh_token`)
- Pagination
- Code modularization (services, components, views)
- Responsive UI
- Secure session handling

---

## 👨‍💼 Author

**Lucas Martínez**
📌 GitHub: [@LucasMartinez99](https://github.com/LucasMartinez99)
🔗 LinkedIn: [lucas-software-engineer](https://www.linkedin.com/in/lucas-software-engineer/)

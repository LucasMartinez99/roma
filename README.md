# 🎥 Movies Admin - Prueba Frontend Roma Shop

Este proyecto es una aplicación web construida con **React + Vite** que consume una **API REST protegida con OAUTH2**. Permite al usuario autenticarse, gestionar un listado de películas (crear, leer, editar y eliminar), y navegar entre páginas de resultados. La interfaz está diseñada con **Bootstrap 5** y utiliza **SweetAlert2** para una experiencia visual más amigable.

---

## ✅ Funcionalidades principales

### 🔐 Autenticación OAUTH2 (con PKCE)

* Login implementado **manualmente con `fetch`**, sin usar bibliotecas externas.
* Implementación completa de **PKCE** con `code_verifier` y `code_challenge`.
* Almacenamiento de `access_token` y `refresh_token` en `localStorage`.
* Verificación automática del token y renovación con `refresh_token`.
* Protección de rutas mediante componente `ProtectedRoute`.

### 🎬 CRUD de películas

* Listado paginado de películas conectadas a la API real.
* Creación, edición y eliminación desde un formulario modal.
* Asociaciones con estudios y productores ya existentes.
* Confirmación visual antes de eliminar una película.

### 🎨 Interfaz moderna y responsiva

* UI desarrollada con **Bootstrap 5**.
* Alertas y diálogos amigables con **SweetAlert2**.
* Indicadores de carga al iniciar sesión.
* Compatible con dispositivos móviles y escritorio.

---

## 🚀 Tecnologías utilizadas

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Bootstrap 5](https://getbootstrap.com/)
* [SweetAlert2](https://sweetalert2.github.io/)
* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## 📂 Estructura del proyecto

```
roma-proyect/
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

## 🛠️ Instalación y ejecución local

```bash
# 1. Clona el repositorio
git clone https://github.com/LucasMartinez99/roma.git
cd roma

# 2. Instala las dependencias
npm install

# 3. Ejecuta el frontend
npm run dev
```

Asegúrate de que tu navegador permita redirecciones desde `http://localhost:3000/callback`.

---

## 🧠 Conceptos aplicados

* Arquitectura cliente-API (frontend consumiendo endpoints externos)
* Autenticación OAUTH2 con PKCE
* Uso de `fetch` y control de tokens con `access_token` y `refresh_token`
* Paginación
* Modularización de código (servicios, componentes y vistas)
* UI responsiva sin frameworks pesados
* Seguridad en el manejo de sesión

---

## 👨‍💼 Autor

Desarrollado por **Ing. Lucas Martínez** como parte de la prueba técnica para **Roma Shop**.

📌 GitHub: [@LucasMartinez99](https://github.com/LucasMartinez99)

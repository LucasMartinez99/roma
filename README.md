🎥 Movies Admin - Prueba Frontend Roma Shop

Este proyecto es una aplicación frontend construida con React + Vite que consume una API REST para gestionar un listado de películas. Incluye autenticación OAUTH2, sistema CRUD completo (crear, leer, editar y eliminar) y una interfaz moderna basada en Bootstrap 5 y SweetAlert2.

✅ Funcionalidades principales

🔐 Autenticación OAUTH2

Login manual mediante fetch sin librerías externas.

Almacena el access_token en localStorage.

Protege las rutas privadas.

Backend Express incluido como proxy local para evitar errores de CORS.

🎥 CRUD de películas

Listado paginado de películas.

Filtro por título en tiempo real.

Crear nueva película desde un modal Bootstrap.

Edición inline de los campos.

Eliminación con confirmación visual.

🎨 Interfaz moderna

Interfaz responsiva con Bootstrap 5.

Feedback amigable con SweetAlert2.

Botón de Cerrar sesión.

Indicador visual de carga al iniciar sesión.

🚀 Tecnologías utilizadas

React

Vite

Bootstrap 5

SweetAlert2

MockAPI (simulación de backend)

Express.js (servidor proxy para autenticación OAUTH2)

📂 Estructura del proyecto

<pre> ## roma-proyect/
├── public/
├── server/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── Login.module.css
│   │   └── images/
│   │       └── image.png
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   └── MoviesPage.jsx
│   ├── services/
│   │   ├── authService.js
│   └── main.jsx
|   └── ProtectedRoute.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
 </pre>

📊 Usuario de prueba para autenticación

Puedes usar el siguiente usuario para probar el sistema:

Usuario: roma@gmail.com
Contraseña: Rom@shopp1ng

🚪 Instalación y ejecución

# Clona el repositorio

# Instala las dependencias
npm install

# Ejecuta el frontend
npm run dev

# Ejecuta el servidor Express para login
cd server
npm install
node index.js

🧠 Conceptos aplicados

Arquitectura cliente-servidor (frontend + API REST)

Manejo de estado con useState

Efectos secundarios con useEffect

Modularización del código (servicios + vistas)

Autenticación segura

UI profesional sin librerías pesadas

👨‍💻 Autor

Desarrollado por Ing. Lucas Martínez como parte de la prueba técnica para Roma Shop.

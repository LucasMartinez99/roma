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

roma-proyect/
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
│   │   └── authService.js
│   ├── ProtectedRoute.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── vite.config.js
├── package.json
├── package-lock.json
└── README.md

📊 Usuario de prueba para autenticación

Puedes usar el siguiente usuario para probar el sistema:

Usuario: roma@gmail.com
Contraseña: Rom@shopp1ng

🚪 Instalación y ejecución

# Clona el repositorio
https://github.com/tu-usuario/roma-movies.git

cd roma-movies

# Instala las dependencias
npm install

# Ejecuta el frontend
npm run dev

# (opcional) Ejecuta el servidor Express para login
cd server
npm install
node index.js

🔧 Conectarse a una API externa

Editá la constante API_URL en MoviesPage.jsx:

const API_URL = "https://api.romashop.com/v1/movies";

Si la API requiere token:

headers: {
  "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
  "Content-Type": "application/json"
}

Ajustá el formato de respuesta si cambia:

const data = await res.json();
setMovies(data.results || data);

🧠 Conceptos aplicados

Arquitectura cliente-servidor (frontend + API REST)

Manejo de estado con useState

Efectos secundarios con useEffect

Modularización del código (servicios + vistas)

Autenticación segura

UI profesional sin librerías pesadas

👨‍💻 Autor

Desarrollado por Ing. Lucas Martínez como parte de la prueba técnica para Roma Shop.
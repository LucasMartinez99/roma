import { refreshTokenIfNeeded, logout } from "./authService";

export const secureFetch = async (url, options = {}) => {
    try {
        await refreshTokenIfNeeded();
    } catch (err) {
        console.error("Error al refrescar el token:", err);
        logout();
        return Promise.reject(err);
    }

    const token = localStorage.getItem("access_token");

    const headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { ...options, headers });
    
    if (response.status === 401) {
        console.warn("Token rechazado por el servidor. Cerrando sesión.");
        logout();
        return Promise.reject(new Error("Token no autorizado"));
    }

    return response;
};

import { refreshTokenIfNeeded } from "./authService";

export const secureFetch = async (url, options = {}) => {
    await refreshTokenIfNeeded();
    const token = localStorage.getItem("access_token");

    const headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
    };

    return fetch(url, { ...options, headers });
};

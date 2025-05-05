import { generateCodeVerifier, generateCodeChallenge } from "./pkce";
import Swal from 'sweetalert2';

const CLIENT_ID = "frontweb";
const REDIRECT_URI = "http://localhost:3000/callback";
const AUTH_URL = "https://cloud.romapy.com/oauth2/authorize";
const TOKEN_URL = "https://cloud.romapy.com/oauth2/token";

export async function redirectToLogin() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = crypto.randomUUID();

    localStorage.setItem("pkce_verifier", codeVerifier);
    localStorage.setItem("pkce_state", state);

    const url = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${state}&scope=READ%20WRITE`;

    window.location.href = url;
}

export async function exchangeCodeForToken(code, codeVerifier) {
    const credentials = btoa("frontweb:123456");

    const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${credentials}`
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: codeVerifier
        })
    });

    const text = await response.text();
    try {
        const data = JSON.parse(text);

        if (!response.ok) {
            console.error("Respuesta inválida:", data);
            throw new Error(data.error_description || "Fallo al intercambiar el código");
        }

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        const expiresIn = data.expires_in;
        const expirationTime = Date.now() + expiresIn * 1000;
        localStorage.setItem("token_expiration", expirationTime.toString());
        return data;

    } catch (e) {
        console.error("Respuesta no es JSON válida:", text);
        throw new Error("Fallo al intercambiar el código");
    }
}

export async function refreshTokenIfNeeded() {
    
    const expiration = parseInt(localStorage.getItem("token_expiration"), 10);
    const now = Date.now();

    if (isNaN(expiration) || now < expiration - 60000) {
        return localStorage.getItem("access_token");
    }

    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    const credentials = btoa("frontweb:123456");

    const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${credentials}`
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error_description || "Fallo al refrescar el token");
    }

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    const expiresIn = data.expires_in;
    const expirationTime = Date.now() + expiresIn * 1000;
    localStorage.setItem("token_expiration", expirationTime.toString());

    return data.access_token;
}

export function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expiration");
    localStorage.removeItem("pkce_verifier");
    localStorage.removeItem("pkce_state");

    setTimeout(() => {
        window.location.href = "/";
    }, 1500);

    Swal.fire({
        title: "Sesión cerrada",
        text: "Hasta pronto",
        icon: "info",
        timer: 1500,
        showConfirmButton: false
    });
}

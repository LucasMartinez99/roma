// src/services/pkce.js
export function generateCodeVerifier(length = 128) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, b => ('0' + b.toString(16)).slice(-2)).join('');
}

export async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

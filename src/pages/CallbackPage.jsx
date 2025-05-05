/**
 * Página Callback de OAUTH2.
 * Recibe el authorization code y verifica el estado antes de intercambiarlo por un access token.
 */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { exchangeCodeForToken, logout } from "../services/authService";

function CallbackPage() {
    const navigate = useNavigate();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");
        const savedState = localStorage.getItem("pkce_state");
        const codeVerifier = localStorage.getItem("pkce_verifier");

        const alreadyExchanged = localStorage.getItem("token_expiration");

        if (alreadyExchanged) {
            navigate("/movies");
            return;
        }

        if (!code || !state || !codeVerifier) {
            Swal.fire("Error", "Faltan parámetros. Intente de nuevo.", "error");
            return;
        }

        if (state !== savedState) {
            Swal.fire("Error", "Estado inválido. Intente iniciar sesión nuevamente.", "error").then(() => {
                logout();
            });
            return;
        }

        Swal.fire({
            title: "Iniciando sesión...",
            text: "Espere un momento",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        exchangeCodeForToken(code, codeVerifier)
            .then(() => {
                Swal.close();
                navigate("/movies");
            })
            .catch((err) => {
                console.error("Error intercambiando token:", err);
                Swal.fire("Error", "No se pudo obtener el token", "error").then(() => {
                    logout();
                });
            });
    }, [navigate]);

    return null;
}

export default CallbackPage;

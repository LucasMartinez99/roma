import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { exchangeCodeForToken } from "../services/authService";

function CallbackPage() {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
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
            alert("Faltan parámetros. Intente de nuevo.");
            return;
        }

        if (state !== savedState) {
            alert("Estado inválido. Intente iniciar sesión nuevamente.");
            return;
        }

        if (!processing) {
            setProcessing(true);

            exchangeCodeForToken(code, codeVerifier)
                .then(() => navigate("/movies"))
                .catch((err) => {
                    console.error("Error intercambiando token:", err);
                    alert("Error al obtener token");
                    setProcessing(false);
                });
        }
    }, [navigate, processing]);

    return <div>Procesando inicio de sesión...</div>;
}

export default CallbackPage;

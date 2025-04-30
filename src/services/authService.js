export async function loginWithOAuth(username, password) {
    try {
        const response = await fetch("http://192.168.100.19:3001/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error del backend:", data);
            throw new Error(data.error_description || "Login fallido");
        }

        localStorage.setItem("access_token", data.access_token);
        return data;
    } catch (err) {
        console.error("Fallo de login (proxy):", err);
        throw err;
    }
}

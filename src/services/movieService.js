import { secureFetch } from "../services/secureFetch";
const API_URL = "https://cloud.romapy.com/v1/movies";

export const fetchMovies = async (page = 0, size = 5) => {
    try {
        const url = new URL(API_URL);
        url.searchParams.append("page", page); 
        url.searchParams.append("size", size); 
        
        const res = await secureFetch(url.toString());
        const data = await res.json();
        return Array.isArray(data.content) ? data.content : [];
    } catch (error) {
        console.error("Error al obtener películas:", error);
        return [];
    }
};


export const fetchOptions = async () => {
    const [studioRes, producerRes] = await Promise.all([
        secureFetch("https://cloud.romapy.com/v1/studios/list"),
        secureFetch("https://cloud.romapy.com/v1/producers/list"),
    ]);

    const studios = await studioRes.json();
    const producers = await producerRes.json();

    return {
        studios: studios || [],
        producers: producers || [],
    };
};

export const deleteMovie = async (id) => {
    const res = await secureFetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    return res.ok;
};

export const saveMovie = async (data, mode = "add", id = null) => {
    const payload = {
        name: data.name,
        studios: data.studios.map((s) => ({ id: s })),
        producers: data.producers.map((p) => ({ id: p })),
    };

    const res = await secureFetch(mode === "add" ? API_URL : `${API_URL}/${id}`, {
        method: mode === "add" ? "POST" : "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
    });   

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }

    return await res.json();
};

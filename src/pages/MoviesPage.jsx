import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import MovieForm from "./MovieForm";
import {
    fetchMovies,
    fetchOptions,
    deleteMovie,
    saveMovie
} from "../services/movieService";


function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        studios: [],
        producers: []
    });

    const [modalMode, setModalMode] = useState("add");
    const [page, setPage] = useState(0);
    const size = 10;
    const navigate = useNavigate();
    const [studios, setStudios] = useState([]);
    const [producers, setProducers] = useState([]);

    const handleLogout = () => {
        logout();
    };

    const loadMovies = async () => {
        try {
            const data = await fetchMovies(page, size);
            setMovies(data);
        } catch (err) {
            console.error("Error cargando películas:", err);
        }
    };

    const loadOptions = async () => {
        try {
            const { studios, producers } = await fetchOptions();
            setStudios(studios);
            setProducers(producers);
        } catch (err) {
            console.error("Error cargando opciones:", err);
        }

    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/");
            return;
        }

        loadMovies();
        loadOptions();

    }, [page]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            const ok = await deleteMovie(id);

            if (ok) {
                await loadMovies();
                Swal.fire("Eliminado", "La película fue eliminada", "success");
            } else {
                Swal.fire("Error", "No se pudo eliminar la película", "error");
            }
        }
    };

    const handleEdit = async (movie) => {
        setModalMode("edit");
        setEditId(movie.id);

        const { studios, producers } = await fetchOptions();

        setStudios(studios);
        setProducers(producers);

        setFormData({
            name: movie.name,
            studios: movie.studios.map((s) => s.id),
            producers: movie.producers.map((p) => p.id),
        });

    };

    const handleFormChange = (e) => {
        const { name, options, multiple, value } = e.target;

        if (multiple) {
            const values = Array.from(options)
                .filter((o) => o.selected)
                .map((o) => o.value);

            setFormData((prev) => ({ ...prev, [name]: values }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveMovie(formData, modalMode, editId);
            Swal.fire("Éxito", `Película ${modalMode === "add" ? "creada" : "actualizada"}`, "success");
            
            loadMovies();
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-12">🎬 Lista de Películas <button className="btn btn-outline-danger" onClick={handleLogout}>
                🔒 Cerrar sesión
            </button>
                <button
                    className="btn btn-primary ms-3"
                    data-bs-toggle="modal"
                    data-bs-target="#addModal"
                    onClick={() => {
                        setModalMode("add");
                        setFormData({ name: "", studios: [], producers: [] });
                    }}
                >
                    ➕ Agregar nueva
                </button>
            </h2>

            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Título</th>
                        <th>Estudio</th>
                        <th>Productor</th>
                        <th>Año</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) =>

                        <tr key={movie.id}>
                            <td>{movie.name}</td>
                            <td>{movie.studios?.[0]?.name || "-"}</td>
                            <td>{movie.producers?.[0]?.name || "-"}</td>
                            <td>{new Date(movie.createdAt).getFullYear()}</td>

                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addModal"
                                    onClick={() => handleEdit(movie)}
                                >
                                    ✏️
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(movie.id)}>🗑</button>
                            </td>
                        </tr>

                    )}
                </tbody>
            </table>

            <div className="d-flex justify-content-center">
                <button className="btn btn-outline-primary me-2" disabled={page === 0} onClick={() => setPage(page - 1)}>←</button>
                <span className="align-self-center">Página {page}</span>
                <button className="btn btn-outline-primary ms-2" disabled={movies.length < size} onClick={() => setPage(page + 1)}>→</button>
            </div>

            <MovieForm
                modalMode={modalMode}
                formData={formData}
                studios={studios}
                producers={producers}
                onChange={handleFormChange}
                onSubmit={handleSubmit}
            />


        </div>
    );
}

export default MoviesPage;

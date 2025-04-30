import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});
    const [newMovie, setNewMovie] = useState({ title: "", studio: "", producer: "", year: "" });
    const limit = 5;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        Swal.fire({
            title: "Sesión cerrada",
            text: "Hasta pronto",
            icon: "info",
            timer: 1500,
            showConfirmButton: false
        });
        navigate("/");
    };

    const API_URL = "https://68121d5b3ac96f7119a6e2ce.mockapi.io/api/v1/movies";

    const fetchMovies = async () => {
        try {
            const url = new URL(API_URL);
            url.searchParams.append("page", page);
            url.searchParams.append("limit", limit);
            if (search.trim()) url.searchParams.append("title", search);
            const res = await fetch(url);
            const data = await res.json();
            setMovies(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error:", err);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [search, page]);

    const handleSearchChange = (e) => setSearch(e.target.value);

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
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchMovies();
            Swal.fire("Eliminado", "La película fue eliminada", "success");
        }
    };


    const handleEdit = (movie) => {
        setEditId(movie.id);
        setEditData(movie);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleSave = async () => {
        const res = await fetch(`${API_URL}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editData)
        });

        if (!res.ok) {
            const error = await res.json();
            Swal.fire("Error", error.message, "error");
            return;
        }
        Swal.fire("Éxito", "Película actualizada", "success");
        setEditId(null);
        fetchMovies();
    };

    const handleNewMovieChange = (e) => {
        const { name, value } = e.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    const handleCreateMovie = async (e) => {
        e.preventDefault();
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMovie)
        });

        if (!res.ok) {
            const error = await res.json();
            Swal.fire("Error", error.message, "error");
            return;
        }

        Swal.fire("Éxito", "Película creada", "success");
        setNewMovie({ title: "", studio: "", producer: "", year: "" });
        const modal = bootstrap.Modal.getInstance(document.getElementById("addModal"));

        modal.hide();
        fetchMovies();
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-12">🎬 Lista de Películas <button className="btn btn-outline-danger" onClick={handleLogout}>
                🔒 Cerrar sesión
            </button></h2>


            <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Buscar por título"
                    value={search}
                    onChange={handleSearchChange}
                />
                <button
                    className="btn btn-primary ms-3"
                    data-bs-toggle="modal"
                    data-bs-target="#addModal"
                >
                    ➕ Agregar nueva
                </button>
            </div>

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
                        editId === movie.id ? (
                            <tr key={movie.id}>
                                <td><input className="form-control" name="title" value={editData.title} onChange={handleEditChange} /></td>
                                <td><input className="form-control" name="studio" value={editData.studio} onChange={handleEditChange} /></td>
                                <td><input className="form-control" name="producer" value={editData.producer} onChange={handleEditChange} /></td>
                                <td><input className="form-control" name="year" type="number" value={editData.year} onChange={handleEditChange} /></td>
                                <td>
                                    <button className="btn btn-success btn-sm me-1" onClick={handleSave}>Guardar</button>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>Cancelar</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={movie.id}>
                                <td>{movie.title}</td>
                                <td>{movie.studio}</td>
                                <td>{movie.producer}</td>
                                <td>{movie.year}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit(movie)}>✏️</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(movie.id)}>🗑</button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>

            <div className="d-flex justify-content-center">
                <button className="btn btn-outline-primary me-2" disabled={page === 1} onClick={() => setPage(page - 1)}>←</button>
                <span className="align-self-center">Página {page}</span>
                <button className="btn btn-outline-primary ms-2" disabled={movies.length < limit} onClick={() => setPage(page + 1)}>→</button>
            </div>

            {/* Modal Bootstrap para agregar */}
            <div className="modal fade" id="addModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={handleCreateMovie}>
                        <div className="modal-header">
                            <h5 className="modal-title">Agregar película</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control mb-2" name="title" placeholder="Título" value={newMovie.title} onChange={handleNewMovieChange} required />
                            <input className="form-control mb-2" name="studio" placeholder="Estudio" value={newMovie.studio} onChange={handleNewMovieChange} required />
                            <input className="form-control mb-2" name="producer" placeholder="Productor" value={newMovie.producer} onChange={handleNewMovieChange} required />
                            <input className="form-control" type="number" name="year" placeholder="Año" value={newMovie.year} onChange={handleNewMovieChange} required />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MoviesPage;

import React from "react";
function MovieForm({
    modalMode,
    formData,
    studios,
    producers,
    onChange,
    onSubmit
}) {
    return (
        <div className="modal fade" id="addModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <form className="modal-content" onSubmit={onSubmit}>
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {modalMode === "add" ? "Agregar película" : "Editar película"}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <label className="form-label">Título</label>
                        <input
                            className="form-control mb-3"
                            name="name"
                            placeholder="Título"
                            value={formData.name}
                            onChange={onChange}
                            required
                        />

                        <label className="form-label">Estudios</label>
                        <select
                            className="form-select mb-3"
                            name="studios"
                            value={formData.studios}
                            onChange={onChange}
                            multiple
                            required
                        >
                            {studios.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>

                        <label className="form-label">Productores</label>
                        <select
                            className="form-select mb-3"
                            name="producers"
                            value={formData.producers}
                            onChange={onChange}
                            multiple
                            required
                        >
                            {producers.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MovieForm;

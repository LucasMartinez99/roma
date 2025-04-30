import { useState } from "react";
import { loginWithOAuth } from "../services/authService";
import { useNavigate } from "react-router-dom";
import styles from '../assets/css/Login.module.css';
import RomaLogo from "../assets/images/image.png";
import Swal from 'sweetalert2';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setStatus(null);

        Swal.fire({
            title: 'Iniciando sesión...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            await loginWithOAuth(username, password);
            Swal.close();

            await Swal.fire({
                title: 'Bienvenido',
                text: 'Sesión iniciada correctamente',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });

            navigate("/movies");
        } catch (err) {
            Swal.close();
            setStatus("error");
            Swal.fire({
                title: 'Error',
                text: err.message || "No se pudo iniciar sesión",
                icon: 'error'
            });
        }
    };

    return (

        <div className={styles.loginBody}>

            <section className={styles.loginSection}>
                <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>

                <div className={styles.signin}>
                    <div className={styles.content}>

                        <div align="center">
                            <img src={RomaLogo} alt="Roma Logo" style={{ width: "300px", height: "auto" }} />
                        </div>

                        {status === "success" && (
                            <strong className="alert alert-success">Identificado correctamente</strong>
                        )}

                        {status === "error" && (
                            <strong className="alert alert-danger">Error al identificar</strong>
                        )}

                        <form className={styles.form} method="post" onSubmit={handleLogin}>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    name="user"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <i>Usuario</i>
                            </div>

                            <div className={styles.inputBox}>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <i>Contraseña</i>
                            </div>

                            <div className={styles.inputBox}>
                                <input type="submit" value="Ingresar" />
                            </div>
                        </form>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default LoginPage;

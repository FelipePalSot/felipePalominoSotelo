import "./inicioSesion-styles.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function InicioSesion() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      login(nombre.trim());
      navigate("/lista-productos");
    }
  };

  return (
    <main className="auth__container">
      <section className="auth__panel">
        <h1 className="page-title">Iniciar sesión</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="nombre">Nombre completo</label>
              <input id="nombre" type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" type="email" required />
            </div>
            <div className="form-field">
              <label htmlFor="password">Contraseña</label>
              <input id="password" type="password" required />
            </div>
          </div>
          <button className="btn btn--primary btn--block" type="submit">Ingresar</button>
        </form>

        <p className="auth__alt">
          ¿No tienes cuenta? <Link className="link" to="/registro-clientes">Regístrate</Link>
        </p>
      </section>
    </main>
  );
}
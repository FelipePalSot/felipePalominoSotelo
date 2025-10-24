import "./registroClientes-style.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import { validateLength } from "../../server/utils/validation.js";

export default function RegistroClientes() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Normaliza al salir del campo (trim + colapso de espacios)
  const normalizeOnBlur = (setter, fieldName, min = 0, max = Infinity) => (e) => {
    const r = validateLength(e.target.value, { fieldName, min, max });
    if (r.valid) setter(r.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const vNombre = validateLength(nombre,  { required: true, min: 3,  max: 80, fieldName: "Nombre completo" });
    const vEmail  = validateLength(email,   { required: true, min: 5,  max: 254, fieldName: "Correo electrónico" });
    const vPwd    = validateLength(password,{ required: true, min: 15, max: 64, fieldName: "Contraseña" });

    const next = {};
    if (!vNombre.valid) next.nombre = vNombre.error;
    if (!vEmail.valid)  next.email = vEmail.error;
    if (!vPwd.valid)    next.password = vPwd.error;

    setErrors(next);
    if (Object.keys(next).length) return; // bloquea envío si hay errores

    // flujo original
    login(vNombre.value);
    navigate("/lista-productos");
  };

  return (
    <main className="auth__container">
      <div className="auth__panel">
        <h1 className="page-title">Crear una cuenta</h1>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              id="nombre"
              type="text"
              required
              minLength={3}
              maxLength={80}
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                if (errors.nombre) setErrors((p) => ({ ...p, nombre: undefined }));
              }}
              onBlur={normalizeOnBlur(setNombre, "Nombre completo", 3, 80)}
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? "nombre-error" : undefined}
            />
            {errors.nombre && <small id="nombre-error" className="field-error" aria-live="polite">{errors.nombre}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              required
              minLength={5}
              maxLength={254}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
              }}
              onBlur={normalizeOnBlur(setEmail, "Correo electrónico", 5, 254)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <small id="email-error" className="field-error" aria-live="polite">{errors.email}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              required
              minLength={15}
              maxLength={64}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
              }}
              onBlur={normalizeOnBlur(setPassword, "Contraseña", 15, 64)}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && <small id="password-error" className="field-error" aria-live="polite">{errors.password}</small>}
          </div>

          <div className="btn-container">
            <button type="submit" className="btn">Registrarse</button>
          </div>
        </form>

        <div className="auth__alt">
          <p>¿Ya tienes una cuenta? <Link to="/inicio-sesion" className="link">Inicia Sesión</Link></p>
        </div>
      </div>
    </main>
  );
}

import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="container header__bar">
        <Link className="brand" to="/lista-productos" aria-label="LimpiezaPro, inicio">
          <img src="/assets/imagenes/logo.svg" alt="LimpiezaPro" className="brand__logo" />
          <span className="brand__name">LimpiezaPro</span>
        </Link>

        <form className="search" role="search" aria-label="Buscar productos" onSubmit={(e)=>e.preventDefault()}>
          <label className="sr-only" htmlFor="q">Buscar</label>
          <input id="q" name="q" type="search" placeholder="Buscar detergente, lejía..." />
          <button className="btn btn--primary" type="submit">Buscar</button>
        </form>

        <nav className="nav">
          <NavLink className="nav__link" to="/lista-productos">Productos</NavLink>
          <NavLink className="nav__link" to="/carrito-compras">
            Carrito {cart.length > 0 ? `(${cart.length})` : ""}
          </NavLink>

          {user ? (
            <>
              <span className="nav__link">👋 {user}</span>
              <button className="btn btn--ghost" onClick={logout}>Salir</button>
            </>
          ) : (
            <>
              <NavLink className="nav__link" to="/inicio-sesion">Ingresar</NavLink>
              <NavLink className="nav__link" to="/registro-clientes">Registrarse</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

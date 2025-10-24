// src/pages/detalles-pedido/DetallesPedido.jsx
import "./detallesPedido-styles.css";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import MiniCart from "../../components/MiniCart.jsx";

export default function DetallesPedido() {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Si el carrito está vacío, vuelve al catálogo
  if (cart.length === 0) {
    return (
      <main className="container">
        <h1 className="page-title">Finalizar pedido</h1>
        <p>No hay productos en el carrito.</p>
        <Link className="btn" to="/lista-productos">Ir al catálogo</Link>
      </main>
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías validar campos. Si todo ok:
    navigate("/success-page");
  };

  return (
    <main className="container checkout">
      <h1 className="page-title">Finalizar pedido</h1>

      <form onSubmit={onSubmit} className="grid grid--checkout" noValidate>
        {/* Datos de contacto */}
        <section className="panel">
          <h2>Contacto</h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="nombre">Nombre y apellido</label>
              <input id="nombre" name="nombre" type="text" required />
            </div>
            <div className="form-field">
              <label htmlFor="dni">DNI</label>
              <input id="dni" name="dni" type="text" inputMode="numeric" maxLength="8" required />
            </div>
            <div className="form-field">
              <label htmlFor="correo">Correo</label>
              <input id="correo" name="correo" type="email" required />
            </div>
            <div className="form-field">
              <label htmlFor="telefono">Teléfono</label>
              <input id="telefono" name="telefono" type="tel" required />
            </div>
          </div>
        </section>

        {/* Dirección */}
        <section className="panel">
          <h2>Dirección</h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="distrito">Distrito</label>
              <input id="distrito" name="distrito" type="text" required />
            </div>
            <div className="form-field form-field--wide">
              <label htmlFor="direccion">Dirección</label>
              <input id="direccion" name="direccion" type="text" required />
            </div>
            <div className="form-field">
              <label htmlFor="ref">Referencia (opcional)</label>
              <input id="ref" name="ref" type="text" />
            </div>
          </div>
        </section>

        {/* Entrega */}
        <section className="panel">
          <h2>Método de entrega</h2>
          <fieldset className="radios">
            <label className="radio">
              <input type="radio" name="envio" value="estandar" defaultChecked />
              <span><strong>Envío</strong> — 2 a 3 días • S/ 9.90</span>
            </label>
            <label className="radio">
              <input type="radio" name="envio" value="tienda" />
              <span><strong>Retiro en tienda</strong> — Hoy • S/ 0.00</span>
            </label>
          </fieldset>
        </section>

        {/* Resumen */}
        <aside className="panel panel--sticky" aria-labelledby="resumen">
          <h2 id="resumen">Resumen</h2>
          <MiniCart />
          <button className="btn btn--primary btn--block" type="submit">
            Confirmar compra
          </button>
          <Link className="btn btn--ghost btn--block" to="/carrito-compras">
            Volver al carrito
          </Link>
        </aside>
      </form>
    </main>
  );
}

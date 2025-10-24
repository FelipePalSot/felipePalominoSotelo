// src/pages/success-page/SuccessPage.jsx
import "./successPage-styles.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext.jsx";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Limpia el carrito al llegar aquí (igual que tu JS original)
    clearCart();
  }, [clearCart]);

  return (
    <main className="container">
      <section className="success">
        <img className="success__icon" src="/assets/imagenes/ok.svg" alt="" />
        <h1 className="page-title">¡Gracias por tu compra!</h1>
        <p>Te enviamos un correo con el detalle de tu pedido.</p>
        <div className="success__actions">
          <Link className="btn btn--primary" to="/lista-productos">Seguir comprando</Link>
          <Link className="btn btn--ghost" to="/carrito-compras">Ver carrito</Link>
        </div>
      </section>
    </main>
  );
}

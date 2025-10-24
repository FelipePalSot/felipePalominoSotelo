// src/components/SummaryBox.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function SummaryBox() {
  const { subtotal, shipping, total, PEN } = useCart();

  return (
    <aside className="cart-summary" aria-labelledby="resumen-title">
      <h2 id="resumen-title">Resumen</h2>
      <dl className="summary">
        <div className="summary-row">
          <dt>Subtotal</dt><dd id="summary-subtotal">{PEN.format(subtotal)}</dd>
        </div>
        <div className="summary-row">
          <dt>Envío</dt><dd id="summary-shipping">{PEN.format(shipping)}</dd>
        </div>
        <div className="summary-row summary-row--total">
          <dt>Total</dt><dd><strong id="summary-total">{PEN.format(total)}</strong></dd>
        </div>
      </dl>
      <div className="summary__actions">
        <Link className="btn btn--primary btn--block" to="/detalles-pedido">
          Finalizar compra
        </Link>
        <Link className="btn btn--ghost btn--block" to="/lista-productos">
          Seguir comprando
        </Link>
      </div>
    </aside>
  );
}

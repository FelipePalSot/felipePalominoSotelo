// src/components/MiniCart.jsx
import { useCart } from "../context/CartContext.jsx";

export default function MiniCart() {
  const { cart, PEN, subtotal, shipping, total } = useCart();

  if (cart.length === 0) {
    return <p>No hay productos en el carrito.</p>;
  }

  return (
    <>
      <ul className="mini-cart">
        {cart.map(item => (
          <li key={item.id} className="mini-cart__item">
            <img src={item.img} alt="" />
            <span>{item.title} ×{item.quantity}</span>
            <strong>{PEN.format(item.price * item.quantity)}</strong>
          </li>
        ))}
      </ul>

      <dl className="summary">
        <div className="summary__row"><dt>Subtotal</dt><dd>{PEN.format(subtotal)}</dd></div>
        <div className="summary__row"><dt>Envío</dt><dd>{PEN.format(shipping)}</dd></div>
        <div className="summary__row summary__row--total">
          <dt>Total</dt><dd><strong>{PEN.format(total)}</strong></dd>
        </div>
      </dl>
    </>
  );
}

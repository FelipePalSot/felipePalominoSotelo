import "./carritoCompras-styles.css";
import { useCart } from "../../context/CartContext.jsx";
import SummaryBox from "../../components/SummaryBox.jsx";

export default function CarritoCompras() {
  const { cart, removeFromCart, updateQty, PEN, subtotal } = useCart();

  const isEmpty = cart.length === 0;

  return (
    <main className="container cart">
      <h1 className="page-title">Tu carrito</h1>

      <div className="grid grid--cart">
        {/* Lista del carrito */}
        <section className="cart-items" aria-label="Productos en el carrito">
          {isEmpty ? (
            <p className="cart-empty">Tu carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <article key={item.id} className="cart-item">
                <img className="cart-item-img" src={item.img} alt={item.title} />
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">{PEN.format(item.price)}</p>
                  <div className="cart-item-qty">
                    <label htmlFor={`qty-${item.id}`}>Cantidad</label>
                    <input
                      id={`qty-${item.id}`}
                      name={`qty-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQty(item.id, e.target.value)}
                    />
                  </div>
                </div>
                <p className="cart-item-subtotal">
                  {PEN.format(item.price * item.quantity)}
                </p>
                <button
                  className="btn btn--link cart-item-remove"
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Quitar
                </button>
              </article>
            ))
          )}
        </section>

        {/* Resumen */}
        {!isEmpty && <SummaryBox />}
      </div>
    </main>
  );
}

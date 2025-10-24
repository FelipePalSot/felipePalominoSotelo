import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart, PEN } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <article className="card product">
      {/* El link a detalles lo dejamos para la siguiente etapa */}
      <a className="product__link" href="#">
        <img className="product__img" src={product.img} alt={product.title} />
        <h3 className="product__title">{product.title}</h3>
        <p className="product__price">{PEN.format(product.price)}</p>
        <p className="product__meta">{product.meta}</p>
      </a>
      <div className="product__actions">
        <button className="btn btn--secondary" onClick={handleAdd}>
          Agregar
        </button>
      </div>
    </article>
  );
}

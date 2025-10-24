import "./listaProductos-styles.css";
import ProductCard from "../../components/ProductCard.jsx";
import React, { useState, useMemo } from 'react';

const PRODUCTS = [
  {
    id: "detergente-polvo-150g",
    title: "Detergente en polvo 150 g",
    price: 3.5,
    img: "/assets/products/detergente-polvo-150g.jpg",
    meta: "Lavandería • Rinde 5 lavadas",
    category: "Lavanderia",
  },
  {
    id: "lavavajillas-250ml",
    title: "Lavavajillas 250 ml",
    price: 5.0,
    img: "/assets/products/lavavajillas-250ml.jpg",
    meta: "Cocina • Desengrasa rápido",
    category: "cocina",
  },
  {
    id: "multiusos-500ml",
    title: "Limpiador multiusos 500 ml",
    price: 7.8,
    img: "/assets/products/multiusos-500ml.jpg",
    meta: "Multiusos • Aroma fresco",
    category: "multiusos",
  },
  {
    id: "lejia-1l",
    title: "Lejía 1 L",
    price: 4.2,
    img: "/assets/products/lejia-1l.jpg",
    meta: "Desinfección • Cloro",
    category: "baño",
  },
];

export default function ListaProductos() {

  const [category, setCategory] = useState('all');
  

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = category === 'todas' || 
        product.category.toLowerCase() === category.toLowerCase();

      return matchesCategory;
    });
  }, [category]);


  return (
    <main className="container">

      <section className="hero hero--clean">
        <div className="hero__content">
          <h1 className="hero__title">Artículos de limpieza confiables</h1>
          <p className="hero__subtitle">Cuidado del hogar • Desinfección • Lavandería</p>
        </div>
        <picture className="hero__media">
          <img src="/assets/imagenes/hero-limpieza.jpg" alt="Productos de limpieza organizados" />
        </picture>
      </section>

      
      <section className="filters" aria-label="Filtros del catálogo">
        <div className="filters__row">
          <div className="filters__group">
            <label htmlFor="cat">Categoría</label>
            <select 
              id="cat" 
              name="cat" 
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              >
                <option value="todas">Todas</option>
                <option value="lavanderia">Lavanderia</option>
                <option value="cocina">Cocina</option>
                <option value="baño">Baño</option>
                <option value="multiusos">Multiusos</option>
            </select>
          </div>
        </div>
      </section>

      
      {/* <section className="grid--products" aria-label="Listado de productos">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section> */}


      <section className="grid--products" aria-label="Listado de productos">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <div className="text-center py-8" style={{ flexBasis: '100%' }}>
            <p className="text-lg text-gray-600">No se encontraron productos que coincidan con su búsqueda.</p>
          </div>
        )}
      </section>
    </main>
  );
}

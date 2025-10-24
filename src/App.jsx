import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ListaProductos from "./pages/lista-productos/ListaProductos.jsx";
import CarritoCompras from "./pages/carrito-compras/CarritoCompras.jsx";
import DetallesPedido from "./pages/detalles-pedido/DetallesPedido.jsx";
import SuccessPage from "./pages/success-page/SuccessPage.jsx";
import RegistroClientes from "./pages/registro-clientes/RegistroClientes.jsx";
import InicioSesion from "./pages/inicio-sesion/InicioSesion.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ListaProductos />} />
        <Route path="/lista-productos" element={<ListaProductos />} />
        <Route path="/carrito-compras" element={<CarritoCompras />} />
        <Route path="/detalles-pedido" element={<DetallesPedido />} />
        <Route path="/success-page" element={<SuccessPage />} />
        <Route path="/registro-clientes" element={<RegistroClientes />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

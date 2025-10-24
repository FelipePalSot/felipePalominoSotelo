# 🛒 E-Commerce Project - React with Cart

## 👥 Grupo 1 - Integrantes

- **Vanesa Leonela Salcedo Alva**
- **Adolfo Andrés Bravo Andía**
- **Diego Alonso Chiang Meléndez**
- **Felipe Jean Franco Palomino Sotelo**

---

##  Descripción del Proyecto

Proyecto de e-commerce desarrollado con React y Vite, enfocado en la venta de productos de limpieza. Incluye funcionalidades completas de carrito de compras, autenticación de usuarios, gestión de pedidos y diseño responsive.

## ✨ Características Principales

- **Catálogo de Productos**: Visualización y filtrado de productos de limpieza
- **Carrito de Compras**: Gestión completa con agregar, eliminar y actualizar cantidades
- **Sistema de Autenticación**: Inicio de sesión y registro de clientes
- **Proceso de Checkout**: Flujo completo de compra con detalles de pedido
- **Diseño Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- **UI Moderna**: Interfaz limpia y profesional con paleta de colores personalizada
- **Rendimiento Optimizado**: Construcción con Vite para desarrollo rápido

## Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite** - Herramienta de desarrollo y empaquetado rápida
- **React Router DOM** - Navegación entre páginas
- **Context API** - Gestión de estado global (Carrito y Autenticación)
- **CSS3** - Estilos personalizados con variables CSS y media queries
- **ESLint** - Linter para mantener calidad del código

## Estructura del Proyecto

```
ecommerce-project-react-with-cart-main/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── MiniCart.jsx
│   │   └── SummaryBox.jsx
│   ├── context/            # Contextos de React
│   │   ├── CartContext.jsx
│   │   └── AuthContext.jsx
│   ├── pages/              # Páginas de la aplicación
│   │   ├── lista-productos/
│   │   ├── carrito-compras/
│   │   ├── detalles-pedido/
│   │   ├── inicio-sesion/
│   │   ├── registro-clientes/
│   │   └── success-page/
│   ├── App.jsx             # Componente principal
│   └── main.jsx            # Punto de entrada
├── public/
│   └── assets/             # Recursos estáticos
│       ├── imagenes/
│       └── products/
└── package.json
```

## 🛠️ Instalación y Configuración

### Prerequisitos

- Node.js (v16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd ecommerce-project-react-with-cart-main
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```


## Características de Diseño

## 🔧 Configuración de Plugins

Este proyecto utiliza los siguientes plugins oficiales de Vite:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - Usa [Babel](https://babeljs.io/) para Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Usa [SWC](https://swc.rs/) para Fast Refresh

## 📄 Páginas del Proyecto

1. **Lista de Productos** (`/`) - Catálogo principal con filtros
2. **Carrito de Compras** (`/carrito`) - Gestión del carrito
3. **Detalles del Pedido** (`/checkout`) - Proceso de checkout
4. **Inicio de Sesión** (`/login`) - Autenticación de usuarios
5. **Registro** (`/registro`) - Registro de nuevos clientes
6. **Página de Éxito** (`/success`) - Confirmación de pedido

## Contribuciones

Este proyecto fue desarrollado como parte de una actividad académica por el Grupo 1.

## Fecha

12 Octubre 2025

---

Desarrollado por el Grupo 1
# felipePalominoSotelo

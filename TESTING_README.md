# 🧪 Sistema Completo de Pruebas - Avance Testing

Este proyecto implementa un **sistema integral de testing** que incluye pruebas unitarias, de integración, de carga y end-to-end (E2E).

---

## 📋 Tabla de Contenidos

- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Tipos de Pruebas](#-tipos-de-pruebas)
- [Configuración](#-configuración)
- [Ejecutar Pruebas](#-ejecutar-pruebas)
- [Screenshots Generados](#-screenshots-generados)
- [Cobertura de Código](#-cobertura-de-código)

---

## 🏗️ Arquitectura del Proyecto

```
Avance_Testing/
├── src/
│   ├── client/          # Frontend React
│   ├── server/          # Backend Express
│   │   ├── index.js     # Servidor con endpoints /login y /register
│   │   ├── server.js    # Script de arranque
│   │   └── utils/
│   │       └── validation.js  # Funciones de validación robustas
│   └── pages/           # Páginas React
│       ├── inicio-sesion/
│       └── registro-clientes/
├── tests/
│   ├── unit/            # Pruebas unitarias (Jest)
│   ├── integration/     # Pruebas de integración (Jest + Supertest)
│   └── load/            # Pruebas de carga (Artillery)
└── cypress/
    ├── e2e/             # Pruebas E2E
    │   ├── inicio-sesion.cy.js
    │   └── registro-clientes.cy.js
    └── screenshots/     # Screenshots generados automáticamente
```

---

## 🧪 Tipos de Pruebas

### 1. **Pruebas Unitarias** (`tests/unit/`)

Prueban funciones individuales de forma aislada.

**Archivo**: `validation.test.js`

**Qué prueba**:
- ✅ Función `validateLength()` con 24 casos de prueba
- ✅ Validación de campos obligatorios
- ✅ Validación de longitudes mínimas y máximas
- ✅ Normalización de espacios
- ✅ Soporte de emojis y caracteres especiales
- ✅ Trim y procesamiento de strings

**Ejecutar**:
```bash
npm run test:unit
```

**Cobertura actual**: 100% en `validation.js`

---

### 2. **Pruebas de Integración** (`tests/integration/`)

Prueban el funcionamiento completo de los endpoints del servidor.

**Archivo**: `integration.test.js`

**Qué prueba**:
- ✅ Endpoint `POST /login` (9 tests)
  - Login exitoso con credenciales válidas
  - Login fallido con credenciales incorrectas
  - Validación de nombre, email y contraseña
  - Normalización de datos
- ✅ Endpoint `POST /register` (6 tests)
  - Registro exitoso
  - Validaciones de contraseña (12+ caracteres, letras y números)
  - Validación de email
- ✅ Casos extremos (4 tests)
  - Límites mínimos y máximos
  - Nombres y contraseñas que exceden límites

**Total**: 19 tests

**Ejecutar**:
```bash
npm run test:integration
```

---

### 3. **Pruebas de Carga** (`tests/load/`)

Simulan múltiples usuarios concurrentes para medir el rendimiento del servidor.

**Archivo**: `login-load-test.yml`

**Configuración**:
```yaml
Fase 1 - Warm up:
  - Duración: 60 segundos
  - Usuarios: 10 por segundo
  - Total: ~600 peticiones

Fase 2 - Load test:
  - Duración: 120 segundos
  - Usuarios: 50 por segundo
  - Total: ~6,000 peticiones
```

**Escenarios probados**:
1. **Login exitoso**: Credenciales válidas → Status 200
2. **Login fallido**: Credenciales incorrectas → Status 401
3. **Registro**: Nuevo usuario → Status 201

**Ejecutar**:
```bash
# Primero, inicia el servidor en otra terminal
npm run server

# Luego ejecuta las pruebas de carga
npm run test:load
```

**Métricas que reporta**:
- Latencia (p50, p95, p99)
- Tasa de errores
- Throughput (requests/segundo)
- Tiempos de respuesta

---

### 4. **Pruebas End-to-End (E2E)** (`cypress/e2e/`)

Prueban el flujo completo de la aplicación desde la perspectiva del usuario.

#### **Inicio de Sesión** (`inicio-sesion.cy.js`)

**Qué prueba**:
- ✅ Página se carga correctamente
- ✅ Login exitoso con datos válidos
- ✅ Redirección a `/lista-productos`

**Screenshots generados**:
1. `1-login-page.png` - Página inicial
2. `2-login-filled-valid.png` - Formulario completo
3. `3-login-success.png` - Redirección exitosa

#### **Registro de Clientes** (`registro-clientes.cy.js`)

**Qué prueba**:
- ✅ Error con contraseña corta (< 15 caracteres)
- ✅ Registro exitoso con datos válidos
- ✅ Redirección a `/lista-productos`

**Screenshots generados**:
1. `1-register-page.png` - Página de registro
2. `2-register-filled-invalid.png` - Datos inválidos
3. `3-register-error.png` - Mensaje de error
4. `4-register-filled-valid.png` - Datos válidos
5. `5-register-success.png` - Registro exitoso

**Ejecutar**:
```bash
# Modo interactivo (con UI)
npm run cy:open

# Modo headless (automático)
npm run cy:run
```

---

## ⚙️ Configuración

### Dependencias Principales

```json
{
  "jest": "^27.5.1",           // Testing framework
  "supertest": "^6.3.4",       // Tests de API HTTP
  "artillery": "^2.0.23",      // Tests de carga
  "cypress": "^14.5.4"         // Tests E2E
}
```

### Archivos de Configuración

- **`jest.config.js`**: Configuración de Jest (unitarios e integración)
- **`cypress.config.js`**: Configuración de Cypress (E2E)
- **`babel.config.cjs`**: Transpilación para Jest

---

## 🚀 Ejecutar Pruebas

### Todas las Pruebas

```bash
# Pruebas unitarias + integración con cobertura
npm test

# Solo unitarias
npm run test:unit

# Solo integración
npm run test:integration

# Pruebas de carga
npm run test:load

# Pruebas E2E (modo interactivo)
npm run cy:open

# Pruebas E2E (automático)
npm run cy:run
```

### Flujo Completo de Testing

```bash
# Terminal 1: Iniciar servidor de desarrollo
npm run dev

# Terminal 2: Ejecutar tests
npm run test:unit && npm run test:integration

# Terminal 3: Pruebas E2E
npm run cy:run

# Terminal 4: Pruebas de carga (opcional)
npm run test:load
```

---

## 📸 Screenshots Generados

Los screenshots se generan automáticamente en:

```
cypress/screenshots/
├── inicio-sesion.cy.js/
│   ├── 1-login-page.png
│   ├── 2-login-filled-valid.png
│   └── 3-login-success.png
└── registro-clientes.cy.js/
    ├── 1-register-page.png
    ├── 2-register-filled-invalid.png
    ├── 3-register-error.png
    ├── 4-register-filled-valid.png
    └── 5-register-success.png
```

---

## 📊 Cobertura de Código

Después de ejecutar `npm test`, la cobertura se genera en:

```
coverage/
├── lcov-report/index.html  # Reporte visual
└── lcov.info               # Datos de cobertura
```

**Ver cobertura en el navegador**:
```bash
open coverage/lcov-report/index.html
```

**Cobertura actual**:
- `validation.js`: 100% (todas las ramas cubiertas)
- `index.js` (servidor): 95%

---

## 🎯 Resumen de Tests

| Tipo | Herramienta | Cantidad | Estado |
|------|-------------|----------|--------|
| **Unitarios** | Jest | 24 tests | ✅ 100% |
| **Integración** | Jest + Supertest | 19 tests | ✅ 100% |
| **E2E** | Cypress | 4 tests | ✅ 100% |
| **Carga** | Artillery | 3 escenarios | ✅ Configurado |

**Total**: **47 tests automatizados** + pruebas de carga

---

## 📝 Validaciones Implementadas

### `validateLength(value, options)`

```javascript
validateLength('Juan Pérez', {
  min: 2,
  max: 100,
  fieldName: 'Nombre',
  required: true,
  trim: true,
  normalizeSpaces: true,
  count: 'grapheme'  // Soporte de emojis
});
```

### `validateEmail(email, options)`

```javascript
validateEmail('test@example.com', {
  fieldName: 'Correo electrónico'
});
```

---

## 🔧 Tecnologías Utilizadas

- **Frontend**: React + Vite
- **Backend**: Express.js
- **Testing**: Jest + Supertest + Cypress + Artillery
- **Validación**: Custom utilities con soporte Unicode
- **CI/CD Ready**: Todos los tests son ejecutables en modo headless

---

## 📚 Recursos Adicionales

- [Documentación de Jest](https://jestjs.io/)
- [Documentación de Cypress](https://docs.cypress.io/)
- [Documentación de Artillery](https://www.artillery.io/docs)
- [Documentación de Supertest](https://github.com/visionmedia/supertest)

---

## 👥 Autor

Proyecto desarrollado como parte del curso de Testing y DevSecOps.

**Fecha**: Octubre 2025

import express from 'express';
import { validateLength, validateEmail } from './utils/validation.js';

const app = express();
app.use(express.json());

// Endpoint de login
app.post('/login', (req, res) => {
  const { nombre, email, password } = req.body;

  // Validar nombre
  const nombreValidation = validateLength(nombre, { 
    min: 2, 
    max: 100,
    fieldName: 'Nombre' 
  });
  if (!nombreValidation.valid) {
    return res.status(400).json({ error: nombreValidation.error });
  }

  // Validar email
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    return res.status(400).json({ error: emailValidation.error });
  }

  // Validar contraseña
  const passwordValidation = validateLength(password, { 
    min: 8, 
    max: 50,
    fieldName: 'Contraseña' 
  });
  if (!passwordValidation.valid) {
    return res.status(400).json({ error: passwordValidation.error });
  }

  // Simular autenticación (en producción consultarías una base de datos)
  const validCredentials = {
    email: 'test@example.com',
    password: 'password123'
  };

  if (emailValidation.value === validCredentials.email && password === validCredentials.password) {
    return res.status(200).json({ 
      message: 'Login exitoso', 
      user: {
        nombre: nombreValidation.value,
        email: emailValidation.value
      }
    });
  }

  return res.status(401).json({ error: 'Credenciales inválidas' });
});

// Endpoint de registro
app.post('/register', (req, res) => {
  const { nombre, email, password } = req.body;

  // Validar nombre
  const nombreValidation = validateLength(nombre, { 
    min: 2, 
    max: 100,
    fieldName: 'Nombre' 
  });
  if (!nombreValidation.valid) {
    return res.status(400).json({ error: nombreValidation.error });
  }

  // Validar email
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    return res.status(400).json({ error: emailValidation.error });
  }

  // Validar contraseña (más estricto para registro)
  const passwordValidation = validateLength(password, { 
    min: 12, 
    max: 50,
    fieldName: 'Contraseña' 
  });
  if (!passwordValidation.valid) {
    return res.status(400).json({ error: passwordValidation.error });
  }

  // Validar que la contraseña tenga letras y números
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  if (!hasLetters || !hasNumbers) {
    return res.status(400).json({ 
      error: 'Contraseña debe contener letras y números' 
    });
  }

  // Simular registro exitoso
  return res.status(201).json({ 
    message: 'Registro exitoso',
    user: {
      nombre: nombreValidation.value,
      email: emailValidation.value
    }
  });
});

export default app;

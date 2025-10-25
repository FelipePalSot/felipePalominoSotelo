import express from 'express';
import { validateLength, validateEmail } from './utils/validation.js';

const app = express();
app.use(express.json());


app.post('/login', (req, res) => {
  const { nombre, email, password } = req.body;

  
  const nombreValidation = validateLength(nombre, { 
    min: 2, 
    max: 100,
    fieldName: 'Nombre' 
  });
  if (!nombreValidation.valid) {
    return res.status(400).json({ error: nombreValidation.error });
  }

  
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    return res.status(400).json({ error: emailValidation.error });
  }

  
  const passwordValidation = validateLength(password, { 
    min: 8, 
    max: 50,
    fieldName: 'Contraseña' 
  });
  if (!passwordValidation.valid) {
    return res.status(400).json({ error: passwordValidation.error });
  }

  // Si todas las validaciones pasan, retornar éxito
  // En producción, aquí se consultaría una base de datos
  return res.status(200).json({ 
    message: 'Login exitoso', 
    user: {
      nombre: nombreValidation.value,
      email: emailValidation.value
    }
  });
});


app.post('/register', (req, res) => {
  const { nombre, email, password } = req.body;

  
  const nombreValidation = validateLength(nombre, { 
    min: 2, 
    max: 100,
    fieldName: 'Nombre' 
  });
  if (!nombreValidation.valid) {
    return res.status(400).json({ error: nombreValidation.error });
  }

  
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    return res.status(400).json({ error: emailValidation.error });
  }

  
  const passwordValidation = validateLength(password, { 
    min: 12, 
    max: 50,
    fieldName: 'Contraseña' 
  });
  if (!passwordValidation.valid) {
    return res.status(400).json({ error: passwordValidation.error });
  }

  
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  if (!hasLetters || !hasNumbers) {
    return res.status(400).json({ 
      error: 'Contraseña debe contener letras y números' 
    });
  }

  
  return res.status(201).json({ 
    message: 'Registro exitoso',
    user: {
      nombre: nombreValidation.value,
      email: emailValidation.value
    }
  });
});

export default app;

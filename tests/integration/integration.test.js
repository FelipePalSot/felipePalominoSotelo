import request from 'supertest';
import app from '../../src/server/index.js';

describe('Tests de Integración - API de Autenticación', () => {
  
  describe('POST /login', () => {
    
    it('debería retornar 200 y el usuario para credenciales válidas', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          nombre: 'Juan Pérez',
          email: 'test@example.com',
          password: 'password123',
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Login exitoso');
      expect(res.body.user).toEqual({
        nombre: 'Juan Pérez',
        email: 'test@example.com'
      });
    });

    it('debería retornar 401 para credenciales incorrectas', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          nombre: 'Juan Pérez',
          email: 'test@example.com',
          password: 'wrongpassword',
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toBe('Credenciales inválidas');
    });

    it('debería retornar 400 si el nombre es muy corto', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          nombre: 'A',
          email: 'test@example.com',
          password: 'password123',
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Nombre debe tener al menos 2 caracteres.');
    });

    it('debería retornar 400 para un formato de email inválido', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          nombre: 'Juan Pérez',
          email: 'invalid-email',
          password: 'password123',
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('El formato de Correo electrónico no es válido.');
    });

    it('debería retornar 400 si la contraseña es muy corta', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          nombre: 'Juan Pérez',
          email: 'test@example.com',
          password: '123',
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Contraseña debe tener al menos 8 caracteres.');
    });

    it('debería retornar 400 si falta el campo nombre', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Nombre es obligatorio.');
    });

    it('debería retornar 400 si falta el campo email', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          nombre: 'Juan Pérez',
          password: 'password123',
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Correo electrónico es obligatorio.');
    });

    it('debería normalizar espacios en el nombre', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          nombre: '  Juan    Pérez  ',
          email: 'test@example.com',
          password: 'password123',
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.user.nombre).toBe('Juan Pérez');
    });

    it('debería trimear el email antes de validar', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          nombre: 'Juan Pérez',
          email: '  test@example.com  ',
          password: 'password123',
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.user.email).toBe('test@example.com');
    });
  });

  describe('POST /register', () => {
    
    it('debería retornar 201 para un registro válido', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          nombre: 'María García',
          email: 'maria@example.com',
          password: 'SecurePass123',
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toBe('Registro exitoso');
      expect(res.body.user).toEqual({
        nombre: 'María García',
        email: 'maria@example.com'
      });
    });

    it('debería retornar 400 si la contraseña es menor a 12 caracteres', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          nombre: 'María García',
          email: 'maria@example.com',
          password: 'Short1',
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Contraseña debe tener al menos 12 caracteres.');
    });

    it('debería retornar 400 si la contraseña no tiene letras', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          nombre: 'María García',
          email: 'maria@example.com',
          password: '123456789012',
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Contraseña debe contener letras y números');
    });

    it('debería retornar 400 si la contraseña no tiene números', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          nombre: 'María García',
          email: 'maria@example.com',
          password: 'SoloLetrasAqui',
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Contraseña debe contener letras y números');
    });

    it('debería retornar 400 para email inválido en registro', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          nombre: 'María García',
          email: 'email-sin-arroba',
          password: 'SecurePass123',
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('El formato de Correo electrónico no es válido.');
    });

    it('debería normalizar el nombre con emojis correctamente', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          nombre: 'Ana 😀',
          email: 'ana@example.com',
          password: 'SecurePass123',
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.user.nombre).toBe('Ana 😀');
    });
  });

  describe('Casos extremos y de borde', () => {
    
    it('debería manejar nombres exactamente en el límite mínimo', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          nombre: 'AB',
          email: 'test@example.com',
          password: 'password123',
        });
      
      expect(res.statusCode).toEqual(200);
    });

    it('debería manejar contraseñas exactamente en el límite mínimo de login', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          nombre: 'Juan Pérez',
          email: 'test@example.com',
          password: '12345678',
        });
      
      expect(res.statusCode).toEqual(401); // Credenciales incorrectas, pero pasa validación
    });

    it('debería rechazar nombres que excedan 100 caracteres', async () => {
      const nombreLargo = 'A'.repeat(101);
      const res = await request(app)
        .post('/login')
        .send({
          nombre: nombreLargo,
          email: 'test@example.com',
          password: 'password123',
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Nombre debe tener como máximo 100 caracteres.');
    });

    it('debería rechazar contraseñas que excedan 50 caracteres', async () => {
      const passwordLarga = 'A'.repeat(51);
      const res = await request(app)
        .post('/login')
        .send({
          nombre: 'Juan Pérez',
          email: 'test@example.com',
          password: passwordLarga,
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Contraseña debe tener como máximo 50 caracteres.');
    });
  });
});

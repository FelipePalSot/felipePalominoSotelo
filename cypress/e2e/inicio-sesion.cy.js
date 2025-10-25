describe('Inicio de Sesión', () => {
  beforeEach(() => {
    cy.visit('/inicio-sesion');
  });

  it('muestra la página de inicio de sesión correctamente', () => {
    cy.screenshot('1-login-page');
    cy.get('h1').should('contain', 'Iniciar sesión');
    cy.get('#nombre').should('be.visible');
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.contains('button', 'Ingresar').should('be.visible');
  });

  it('permite login con datos válidos', () => {
    cy.get('#nombre').type('Juan Pérez');
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123');
    cy.screenshot('2-login-filled-valid');
    
    cy.contains('button', 'Ingresar').click();
    cy.screenshot('3-login-success');
    
    cy.url().should('include', '/lista-productos');
  });
});

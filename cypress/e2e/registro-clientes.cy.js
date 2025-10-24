describe('Registro de clientes', () => {
  beforeEach(() => {
    cy.visit('/registro-clientes');
  });

  it('muestra error si la contraseña es corta', () => {
    cy.screenshot('1-register-page');
    cy.get('#nombre').type('Juan Pérez');
    cy.get('#email').type('juan@example.com');
    cy.get('#password').type('abc');                 // < 15
    cy.screenshot('2-register-filled-invalid');
    cy.contains('button', 'Registrarse').click();
    cy.screenshot('3-register-error');
    cy.get('#password-error')
      .should('be.visible')
      .and('contain', 'Contraseña debe tener al menos 15 caracteres.');
    cy.url().should('include', '/registro-clientes');
  });

  it('permite registro con datos válidos', () => {
    cy.get('#nombre').clear().type('Juan Pérez');
    cy.get('#email').clear().type('juan.ok@example.com');
    cy.get('#password').clear().type('a'.repeat(15));
    cy.screenshot('4-register-filled-valid');
    cy.contains('button', 'Registrarse').click();
    cy.screenshot('5-register-success');
    cy.url().should('include', '/lista-productos');
  });
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("cadastro_usuario", (login, nome, senha) =>{
    let force_a = function(){ return {force:true} };

    cy.get("button").contains("Registrar").click();
    cy.get("input[type='email']").eq(1).clear(force_a()).type(login, force_a());
    cy.get('input[type="name"]').clear(force_a()).type(nome, force_a());
    cy.get('input[type="password"]').eq(1).clear(force_a()).type(senha, force_a());
    cy.get('input[type="password"]').eq(2).clear(force_a()).type(senha, force_a());
    cy.get('label[id="toggleAddBalance"]').click(force_a());
    cy.get('button[type="submit"').eq(1).click(force_a());  
})

Cypress.Commands.add("login", (login, senha) => {
    cy.get('input[type="email"]').first().type(login);
    cy.get('input[type="password"]').first().type(senha);
    cy.get('button[type="submit"').first().click();
})

Cypress.Commands.add("transferencia", (conta, digito, valor, descricao) => {
    cy.get("a[id='btn-TRANSFERÊNCIA'").click();

    cy.get('input[type="accountNumber"]').type(conta);
    cy.get('input[type="digit"]').type(digito);
    cy.get('input[type="transferValue"]').type(valor);
    cy.get('input[type="description"]').type(descricao);
    cy.get('button[type="submit"').first().click();
})

Cypress.Commands.add("get_data", (cy_then) => {
    cy.get('p[id="modalText"').then(($value) => {
        let text = $value.text();
        let pos = text.indexOf("-");
        
        let number = text.substring(pos - 3, pos).trim();
        let digit = text.charAt(pos + 1);

        cy_then(number, digit);
    })
})
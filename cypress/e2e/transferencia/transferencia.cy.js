describe('Cenario Transferencia', () => {
    
    let jefflogin = "jeff@gmail.com";
    let cindyLogin = "cindy@gmail.com";
    let senha = "123456";

    let nomeJeff = "Jeff";
    let nomeCindy = "Cindy";

    beforeEach(() => {
        cy.visit('https://bugbank.netlify.app');
        
        cy.cadastro_usuario(jefflogin, nomeJeff, senha);
        cy.get('a[id="btnCloseModal"').click();
    })

    it('CT0009 - Realizar transferência com dados válidos', () =>{
        cy.cadastro_usuario(cindyLogin, nomeCindy, senha);
        
        let transferencia = function(number, digit){
            cy.get('a[id="btnCloseModal"').click();
            cy.login(jefflogin, senha);
            cy.transferencia(number, digit, 20, "E o Pix?");

            cy.get("p[id='modalText'").contains('Transferencia realizada com sucesso').should('be.visible');
        }

        cy.get_data(transferencia);
    })

    it('CT0010 - Realizar transferência com número da conta inválida', () => {
        cy.login(jefflogin, senha);
        cy.transferencia(1, 5, 10, "E o Pix?");
        cy.get("p[id='modalText'").contains('Conta inválida ou inexistente').should('be.visible');

    })

    it("CT0011 - Realizar transferência com valor acima do saldo existente", () => {
        cy.cadastro_usuario(cindyLogin, nomeCindy, senha);
        
        cy.get('p[id="modalText"').then(($value) => {
            let text = $value.text();
            let pos = text.indexOf("-");
            
            let digit = text.charAt(pos + 1);
            let number = text.substring(pos - 3, pos).trim();

            cy.get('a[id="btnCloseModal"').click();
            cy.login(jefflogin, senha);
            cy.transferencia(number, digit, 2000, "E o Pix?");
            cy.get("p[id='modalText'").contains('Você não tem saldo suficiente para essa transação').should('be.visible');
        })
    })

    it("CT0012 - Realizar transferência com número da conta e com o dígito em brancos", () => {
        cy.login(jefflogin, senha);
        cy.transferencia(" ", " ", 10, "E o Pix?");
        cy.get("p[id='modalText'").contains('Conta inválida ou inexistente').should('be.visible');
    })

    it("CT0013 - Realizar transferência  com valor da transferência vazio", () => {
        cy.login(jefflogin, senha);
        cy.transferencia(223, 1, " ", "E o Pix?");
        cy.get("p[id='modalText'").contains('Inserir quantidade para transferir').should('be.visible');
    })

    it("CT0014 - Realizar transferência com valor da transferência negativo", () => {
        cy.login(jefflogin, senha);
        cy.transferencia(223, 1, -10, "E o Pix?");
        cy.get("p[id='modalText'").contains('Valor da transferência não pode ser 0 ou negativo').should('be.visible');
    })

    it("CT0015 - Realizar transferência sem o preenchimento do campo dígito", () => {
        cy.login(jefflogin, senha);
        cy.transferencia(223, " ", 10, "E o Pix?");
        cy.get("p[id='modalText'").contains('Conta inválida ou inexistente').should('be.visible');
    })

    it("CT0016 - Realizar transferência para o própria conta", () => {
        cy.cadastro_usuario(cindyLogin, nomeCindy, senha);
        
        let trans = function(number, digit){
            cy.get('a[id="btnCloseModal"').click();
            cy.login(cindyLogin, senha);
            cy.transferencia(number, digit, 20, " ");
            cy.get("p[id='modalText'").contains('Nao pode transferir pra mesmo conta').should('be.visible');

        }

        cy.get_data(trans);

    })

    it("CT0017 - Realizar transferência sem o preenchimento do campo Descrição", () => {
        cy.cadastro_usuario(cindyLogin, nomeCindy, senha);
        
        let transferencia = function(number, digit){
            cy.get('a[id="btnCloseModal"').click();
            cy.login(jefflogin, senha);
            cy.transferencia(number, digit, 20, " ");

            cy.get("p[id='modalText'").contains('Transferencia realizada com sucesso').should('be.visible');
        }

        cy.get_data(transferencia);
    })

    it("CT0018 - TESTE", () => {
        
    })

})
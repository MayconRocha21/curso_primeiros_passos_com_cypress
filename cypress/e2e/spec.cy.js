/// <reference types="Cypress" />

// ============================================================================
// TESTES DE AUTENTICAÇÃO
// ============================================================================
describe('Autenticação - Testes de Login', () => {
  it('Deve exibir mensagem de erro ao fazer login com credenciais inválidas', () => {
    cy.visit('/')
    cy.get('div.shop-menu')
      .contains('Login')
      .should('have.attr', 'href', '/login')
      .click()
    cy.contains('Login to your account').should('be.visible')

    // Validar campo de email
    cy.get('[data-qa="login-email"]')
      .type('teste@email.com')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Email Address')
      .and('have.prop', 'required')

    // Validar campo de senha
    cy.get('[data-qa="login-password"]')
      .type('123456')
      .should('have.value', '123456')

    // Validar e clicar no botão de login usando alias
    cy.get('[data-qa="login-button"]')
      .as('btnLogin')
      .should(($button) => {
        expect($button).to.have.text('Login')
        expect($button).to.be.visible
        expect($button).to.have.attr('type', 'submit')
        expect($button).to.have.class('btn')
      })
      .click()
      .click() // Duplicate click para validar

    cy.contains('Your email or password is incorrect!').should('be.visible')
  })
})

// ============================================================================
// TESTES DE NAVEGAÇÃO E EXPLORAÇÃO
// ============================================================================
describe('Navegação - Homepage e Estrutura da Página', () => {
  it('Deve acessar a homepage e validar presença de elementos principais', () => {
    cy.visit('/')
    cy.contains('Automation').should('be.visible')
    cy.get('h1').contains('Automation').should('be.visible')
    cy.get('.features_items').should('exist')
    cy.get('div.features_items').should('exist')
  })

  it('Deve verificar itens disponíveis para compra e acessar pelo data-id', () => {
    cy.visit('/')

    // Acessar elementos filho do container de items
    cy.get('.features_items').should('exist')
    cy.get('.features_items').children().first().should('exist')
    cy.get('.features_items').children().last().should('exist')
    cy.get('.features_items').children().eq(2).should('exist')

    // Acessar produto específico pelo data-id
    cy.get('[data-product-id="2"]').should('exist')
  })
})

// ============================================================================
// TESTES DE CARRINHO DE COMPRAS
// ============================================================================
describe('Carrinho de Compras - Operações Básicas', () => {
  it('Deve adicionar item ao carrinho e fechar modal de confirmação', () => {
    cy.visit('/')

    // Adicionar produto ao carrinho
    cy.get('[data-product-id="2"]').contains('Add to cart').click()

    // Validar modal de sucesso
    cy.get('#cartModal').contains('Added').should('be.visible')

    // Fechar modal
    cy.get('button.close-modal', { timeout: 5000 }).click()
    cy.get('#cartModal').should('not.be.visible')
  })
})

// ============================================================================
// TESTES DE API - INTERCEPT E REQUESTS
// ============================================================================
describe('API - Testes com Intercept e Requests', () => {
  it('Deve interceptar requisição GET de produtos e validar status 200', () => {
    cy.visit('/')
    cy.intercept('GET', '/products').as('getProdutos')

    cy.get('.navbar-nav').contains('Products').click()

    cy.wait('@getProdutos').its('response.statusCode').should('eq', 200)
  })

  it('Deve fazer request GET diretamente à API de produtos', () => {
    cy.request('GET', 'api/productsList').should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).not.to.be.empty

      const body = JSON.parse(response.body)
      expect(body.products).to.be.an('array')
      expect(body.products).to.have.length.above(1)
    })
  })
})

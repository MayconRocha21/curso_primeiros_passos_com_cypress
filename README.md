# Primeiros Passos com Cypress 🚀

## 📚 Sobre este Projeto

Este projeto foi desenvolvido durante o curso **"Primeiros Passos com Cypress"** da plataforma [DIO](https://www.dio.me/), ministrado pela professora **Carolina Santana Louzada**.

O projeto demonstra os conceitos fundamentais de testes automatizados end-to-end (E2E) utilizando Cypress, com foco em boas práticas de desenvolvimento técnico e organização profissional de testes.

---

## 🎯 Objetivo

Aprender os conceitos iniciais do Cypress para automação de testes em aplicações web, cobrindo desde seletores CSS até requisições HTTP e interceptação de rede.

---

## 📋 Estrutura do Projeto

```
cypress/
├── e2e/
│   └── spec.cy.js              # Arquivo de testes principal
├── fixtures/
│   └── example.json            # Dados para testes
└── support/
    ├── commands.js             # Comandos customizados do Cypress
    └── e2e.js                  # Configurações globais de E2E
├── cypress.config.js           # Configuração do Cypress
└── package.json                # Dependências do projeto
```

---

## 🧪 Conceitos de Cypress Utilizados

### 1. **Seletores CSS**

- Seleção por classe: `.features_items`
- Seleção por tag HTML: `h1`
- Seleção combinada: `div.features_items`
- Atributos customizados: `[data-qa="login-email"]`
- Atributos de dados: `[data-product-id="2"]`

```javascript
cy.get('[data-qa="login-email"]')
cy.get('div.shop-menu')
cy.get('.features_items')
```

### 2. **Comando `cy.visit()`**

Navega para uma URL especificada, permitindo o acesso à página a ser testada.

```javascript
cy.visit('/') // Acessa a homepage
```

### 3. **Comando `cy.get()`**

Seleciona elementos do DOM usando seletores CSS para interagir com eles.

```javascript
cy.get('[data-qa="login-button"]')
```

### 4. **Comando `cy.contains()`**

Encontra elementos pelo texto que contêm, útil para localizar botões e labels.

```javascript
cy.contains('Login').click()
cy.contains('Your email or password is incorrect!')
```

### 5. **Asserções com `should()`**

Valida propriedades e comportamentos dos elementos.

```javascript
.should('be.visible')           // Validar visibilidade
.should('have.attr', 'href')    // Validar atributos
.should('have.value', '123456') // Validar valores de input
.should('have.class', 'btn')    // Validar classes CSS
```

### 6. **Encadeamento de Comandos (Chaining)**

Cypress permite encadear múltiplos comandos para criar fluxos de teste fluentes.

```javascript
cy.get('div.shop-menu')
  .contains('Login')
  .should('have.attr', 'href', '/login')
  .click()
```

### 7. **Aliases com `as()`**

Armazena referências a elementos para reutilização no teste, evitando seletores repetitivos.

```javascript
cy.get('[data-qa="login-button"]').as('btnLogin')

// Usar o alias depois
cy.get('@btnLogin').click()
```

### 8. **Manipulação de Elementos**

- `.type()`: Digita texto em inputs
- `.click()`: Clica no elemento
- `.children()`: Acessa elementos filho

```javascript
cy.get('[data-qa="login-email"]').type('teste@email.com')
cy.get('.features_items').children().first()
cy.get('.features_items').children().eq(2)
```

### 9. **Callback Functions com `.then()`**

Permite acessar o elemento JQuery para lógica customizada.

```javascript
cy.get('[data-qa="login-button"]').then(($button) => {
  expect($button).to.have.text('Login')
  cy.wrap($button).click()
})
```

### 10. **Assertions com Expect**

Validações diretas usando a sintaxe BDD do Chai.

```javascript
expect($button).to.have.text('Login')
expect($button).to.be.visible
expect($button).to.have.attr('type', 'submit')
expect($button).to.have.class('btn')
```

### 11. **Intercept de Requisições HTTP**

Monitora e valida requisições feitas pelo navegador sem dependências de backend real.

```javascript
cy.intercept('GET', '/products').as('getProdutos')
cy.wait('@getProdutos').its('response.statusCode').should('eq', 200)
```

### 12. **Requisições HTTP com `cy.request()`**

Faz requisições HTTP diretas à API, útil para validar endpoints sem interação com UI.

```javascript
cy.request('GET', 'api/productsList').should((response) => {
  expect(response.status).to.eq(200)
  expect(response.body).not.to.be.empty
})
```

### 13. **Timeouts**

Configura tempo máximo de espera para elementos aparecerem.

```javascript
cy.get('button.close-modal', { timeout: 5000 }).click()
```

### 14. **Validação de Propriedades de Elementos**

- `.should('have.prop', 'required')`: Valida propriedades HTML
- `.should('not.be.visible')`: Valida negações
- `.should('be.an', 'array')`: Valida tipos

```javascript
cy.get('[data-qa="login-email"]').should('have.prop', 'required')
cy.get('#cartModal').should('not.be.visible')
```

---

## 📦 Requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**

---

## 🚀 Instalação

1. **Clone ou abra o repositório:**

```bash
cd curso_primeiros_passos_com_cypress
```

2. **Instale as dependências:**

```bash
npm install
```

---

## ▶️ Executando os Testes

### Modo Interativo (Cypress UI)

Abre a interface gráfica do Cypress para visualizar e debugar testes em tempo real.

```bash
npm run cypress:open
```

Ou usando o Cypress diretamente:

```bash
npx cypress open
```

### Modo Headless (CLI)

Executa todos os testes em segundo plano sem interface gráfica (ideal para CI/CD).

```bash
npm run cypress:run
```

Ou:

```bash
npx cypress run
```

### Executar Testes Específicos

```bash
npx cypress run --spec "cypress/e2e/spec.cy.js"
```

---

## 📊 Estrutura dos Testes

Os testes estão organizados em 4 suites principais:

### 1️⃣ **Autenticação - Testes de Login**

Valida o comportamento da página de login com credenciais inválidas.

- ✅ Navegação até a página de login
- ✅ Validação de campos (placeholder, atributo required)
- ✅ Verificação de mensagem de erro

### 2️⃣ **Navegação - Homepage e Estrutura da Página**

Testa a navegação e exploração da estrutura HTML da homepage.

- ✅ Acesso à homepage
- ✅ Validação de elementos principais
- ✅ Navegação por seletores CSS e data-attributes

### 3️⃣ **Carrinho de Compras - Operações Básicas**

Testa fluxo básico de adição de produtos ao carrinho.

- ✅ Adicionar item ao carrinho
- ✅ Validação de modal de confirmação
- ✅ Fechamento de modal

### 4️⃣ **API - Testes com Intercept e Requests**

Testa integração com API usando interceptação de rede e requests diretos.

- ✅ Intercept de requisições GET
- ✅ Validação de status HTTP
- ✅ Validação de corpo da resposta (JSON)

---

## 🔧 Configuração do Cypress

O arquivo `cypress.config.js` contém as configurações principais do Cypress:

- **URL base**: Configurada para o domínio de teste
- **Timeout padrão**: 5000ms (pode ser customizado por teste)
- **Viewport**: Resolução de tela para testes

---

## 💡 Boas Práticas Implementadas

✨ **Organização em Describe Blocks**: Testes agrupados por funcionalidade  
✨ **Naming Conventions**: Nomes descritivos em português  
✨ **Assertions Claras**: Validações explícitas e legíveis  
✨ **Uso de Aliases**: Reutilização de elementos sem repetição de seletores  
✨ **Comentários Estratégicos**: Documentação onde agregam valor  
✨ **Encadeamento de Comandos**: Sintaxe fluente e concisa

---

## 📝 Exemplo de Teste Completo

```javascript
describe('Autenticação - Testes de Login', () => {
  it('Deve exibir mensagem de erro ao fazer login com credenciais inválidas', () => {
    // 1. Navegar até a página
    cy.visit('/')

    // 2. Clicar no link de login
    cy.get('div.shop-menu').contains('Login').click()

    // 3. Preencher formulário
    cy.get('[data-qa="login-email"]').type('teste@email.com')
    cy.get('[data-qa="login-password"]').type('123456')

    // 4. Validar e clicar no botão
    cy.get('[data-qa="login-button"]')
      .as('btnLogin')
      .should('have.text', 'Login')
      .click()

    // 5. Validar resultado
    cy.contains('Your email or password is incorrect!').should('be.visible')
  })
})
```

---

## 🎓 Conceitos Aprendidos

| Conceito          | Descrição                                     |
| ----------------- | --------------------------------------------- |
| **E2E Testing**   | Automação de testes de ponta a ponta          |
| **Seletores CSS** | Localizar elementos no DOM                    |
| **Asserções**     | Validar comportamento esperado                |
| **Aliases**       | Armazenar referências de elementos            |
| **Intercept**     | Monitorar requisições HTTP                    |
| **API Testing**   | Validar endpoints sem interação com UI        |
| **Chaining**      | Encadeamento fluente de comandos              |
| **BDD**           | Sintaxe de teste legível em linguagem natural |

---

## 📚 Recursos Adicionais

- [Documentação Oficial do Cypress](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [DIO - Digital Innovation One](https://www.dio.me/)
- [Chai Assertions](https://www.chaijs.com/api/bdd/)

---

## 👩‍🏫 Instrutor

**Professora:** Carolina Santana Louzada  
**Plataforma:** DIO (Digital Innovation One)  
**Curso:** Primeiros Passos com Cypress

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais no curso da DIO.

---

**Desenvolvido com ❤️ durante o curso de Cypress na DIO**

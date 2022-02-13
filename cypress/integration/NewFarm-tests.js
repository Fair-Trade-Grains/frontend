describe('new farm form', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersGrainResults.json'
      })
    })
    
    // cy.visit('https://wheat-cute.herokuapp.com/create-farmer')
    cy.visit('http://localhost:3000/create-farmer')
  })

  it('should have the site title and a form with 7 fields', () => {
    cy.get('.App-header').should('exist')
    cy.get('header h1').contains('Wheatcute')

    cy.get('.new-profile-form').should('exist')
    cy.get('.new-farm-form').should('exist')

    cy.get('form label').should('have.length', 7)
    cy.get('form input').should('have.length', 5)
    cy.get('form select').should('have.length', 1)
    cy.get('form textarea').should('have.length', 1)
  })

  it('should have an input for the NAME', () => {
    cy.get('.new-farm-form label').eq(0).contains("Your name or your farm's name: *required*")
    cy.get('.new-farm-form input').eq(0).should('have.attr', 'required')
    cy.get('.new-farm-form input').eq(0).should('have.attr', 'placeholder', 'Smith Family Farm')
  })

  it('should have an input for the EMAIL', () => {
    cy.get('.new-farm-form label').eq(1).contains("Your business email: *required*")
    cy.get('.new-farm-form input').eq(1).should('have.attr', 'required')
    cy.get('.new-farm-form input').eq(1).should('have.attr', 'placeholder', 'example@email.com')
  })

  // it('should have an input for the name', () => {
  //   cy.get('.new-farm-form label').eq(0).contains("Your name or your farm's name: *required*")
  //   cy.get('.new-farm-form input').eq(0).should('have.attr', 'required')
  //   cy.get('.new-farm-form input').eq(0).should('have.attr', 'placeholder', 'Smith Family Farm')
  // })

  // it('should have an input for the name', () => {
  //   cy.get('.new-farm-form label').eq(0).contains("Your name or your farm's name: *required*")
  //   cy.get('.new-farm-form input').eq(0).should('have.attr', 'required')
  //   cy.get('.new-farm-form input').eq(0).should('have.attr', 'placeholder', 'Smith Family Farm')
  // })

  // it('should have an input for the name', () => {
  //   cy.get('.new-farm-form label').eq(0).contains("Your name or your farm's name: *required*")
  //   cy.get('.new-farm-form input').eq(0).should('have.attr', 'required')
  //   cy.get('.new-farm-form input').eq(0).should('have.attr', 'placeholder', 'Smith Family Farm')
  // })

  // it('should have an input for the name', () => {
  //   cy.get('.new-farm-form label').eq(0).contains("Your name or your farm's name: *required*")
  //   cy.get('.new-farm-form input').eq(0).should('have.attr', 'required')
  //   cy.get('.new-farm-form input').eq(0).should('have.attr', 'placeholder', 'Smith Family Farm')
  // })

  // it('should have an input for the name', () => {
  //   cy.get('.new-farm-form label').eq(0).contains("Your name or your farm's name: *required*")
  //   cy.get('.new-farm-form input').eq(0).should('have.attr', 'required')
  //   cy.get('.new-farm-form input').eq(0).should('have.attr', 'placeholder', 'Smith Family Farm')
  // })
})
describe('farm results view', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersFarmerResults.json'
      })
    })

    // cy.visit('https://wheat-cute.herokuapp.com/farms/')
    cy.visit('http://localhost:3000/farms/')
  })

  it('should have a site header with an h1', () => {
    cy.get('.App-header').should('exist')
    cy.get('header h1').contains('Wheatcute')
  })

  it('should have a search bar in the main', () => {
    cy.get('main .farm-browse-view').should('exist')
    cy.get('.farm-browse-view form').should('exist')
    cy.get('.search-bar').contains('Search by Farm Name')
    cy.get('.search-bar input').should('exist')
  })

  it('should have a farm results container in the main with two farm cards', () => {
    cy.get('main .farm-browse-view').should('exist')
    cy.get('.farm-browse-view section').should('have.class', 'farms-container')
    cy.get('.farms-container .farm-result').should('have.length', 2)
  })

  it('should have a farm card with details for Clark Kent', () => {
    cy.get('.farm-result').eq(0).find('p').eq(0).contains('Clark Kent')
    cy.get('.farm-result').eq(0).find('p').eq(1).contains('South')

    cy.get('.farm-result button').eq(0).should('have.class', 'view-farm-btn')
    cy.get('.view-farm-btn').eq(0).contains('View Profile / Update Grains')
  })

  it('should have a farm card with details for Owen Lars', () => {
    cy.get('.farm-result').eq(1).find('p').eq(0).contains('Owen Lars')
    cy.get('.farm-result').eq(1).find('p').eq(1).contains('Mountain')

    cy.get('.farm-result button').eq(1).should('have.class', 'view-farm-btn')
    cy.get('.view-farm-btn').eq(1).contains('View Profile / Update Grains')
  })
})

describe('filtering results with the search bar', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersFarmerResults.json'
      })
    }).as('gqlReq')

    // cy.visit('https://wheat-cute.herokuapp.com/farms')
    cy.visit('http://localhost:3000/farms').wait('@gqlReq')
  })

  it('should keep track of its value in state', () => {
    cy.get('.search-bar').type('K')
    cy.get('.search-bar input').should('have.value', 'K')

    cy.get('.search-bar').type('e')
    cy.get('.search-bar input').should('have.value', 'Ke')

    cy.get('.search-bar').type('nt')
    cy.get('.search-bar input').should('have.value', 'Kent')

    cy.get('.search-bar input').clear()
    cy.get('.search-bar input').should('have.value', '')

    cy.get('.search-bar').type('wheat rules')
    cy.get('.search-bar input').should('have.value', 'wheat rules')
  })

  it('should display only the results that match what is typed in', () => {
    cy.get('.search-bar').type('C')

    cy.get('.farm-result').should('have.length', 1)
    cy.get('.farm-result').eq(0).contains('Clark Kent')

    cy.get('.search-bar input').clear()
    cy.get('.search-bar').type('Owen')

    cy.get('.farm-result').should('have.length', 1)
    cy.get('.farm-result').eq(0).contains('Owen Lars')
  })

  it('should return results to view as backspaced to empty', () => {
    cy.get('.search-bar').type('Ow')

    cy.get('.farm-result').should('have.length', 1)
    cy.get('.farm-result').contains('Owen Lars')

    cy.get('.search-bar').type('{backspace}')
    cy.get('.farm-result').should('have.length', 1)
    cy.get('.farm-result').eq(0).contains('Owen Lars')

    cy.get('.search-bar').type('{backspace}')
    cy.get('.search-bar input').should('have.value', '')
    cy.get('.farm-result').should('have.length', 2)
    cy.get('.farm-result').eq(0).contains('Clark Kent')
    cy.get('.farm-result').eq(1).contains('Owen Lars')
  })

  it('should display an error message if no results match the search value', () => {
    cy.get('.farm-result').should('have.length', 2)

    cy.get('.search-bar').type('cat')

    cy.get('.farm-result').should('have.length', 0)
    cy.get('.farms-container p').contains('No farms match the current search. Please start over!')
  })
})

describe('navigation away from the farm results view', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersFarmerResults.json'
      })
    }).as('gqlReq')

    // cy.visit('https://wheat-cute.herokuapp.com/farms')
    cy.visit('http://localhost:3000/farms').wait('@gqlReq')
  })

  it('should navigate back to the landing page if the header title is clicked', () => {
    cy.get('.farm-browse-view').should('exist')
    cy.get('.landing-container').should('not.exist')

    cy.url().should('include', '/farms')

    cy.get('header h1').click()

    cy.get('.farm-browse-view').should('not.exist')
    cy.get('.landing-container').should('exist')

    cy.url().should('not.include', '/farms')
  })

  it('should navigate to a farmer profile if a View Profile / Update Grains button is clicked', () => {
    cy.get('.farm-browse-view').should('exist')
    cy.get('.farm-profile-container').should('not.exist')

    cy.url().should('include', '/farms')

    // another stub...
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersProfile.json'
      })
    }).as('gqlNewReq')

    cy.get('.view-farm-btn').eq(0).click()

    cy.get('.farm-browse-view').should('not.exist').wait('@gqlNewReq')
    cy.get('.farm-profile-container').should('exist')
    cy.get('.farm-name').contains('Clark Kent')

    cy.url().should('not.include', '/farms')
    cy.url().should('include', '/new-grain/1')
  })
})
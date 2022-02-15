describe('grain results page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersGrainResults.json'
      })
    }).as('gqlReq')

    cy.visit('https://wheat-cute.herokuapp.com/grains').wait('@gqlReq')
  })

  it('should have a header with an h1', () => {
    cy.get('.App-header').should('exist')
    cy.get('header h1').contains('Wheatcute')
  })

  it('should have a search bar in the main', () => {
    cy.get('main .grain-browse-view').should('exist')
    cy.get('.grain-browse-view form').should('exist')
    cy.get('.search-bar').contains('Search by Grain Type')
    cy.get('.search-bar input').should('exist')
  })

  it('should have a grain results container in the main', () => {
    cy.get('main .grain-browse-view').should('exist')
    cy.get('.grain-browse-view section').should('have.class', 'grains-container')
    cy.get('.grains-container .grain-result').should('have.length', 3)
  })

  it('should have a grain card with details and a link for Amaranth', () => {
    cy.get('.grain-result .grain-name').eq(0).contains('Amaranth')

    cy.get('.grain-result').eq(0).find('.grain-stats p').should('have.length', 4)
    cy.get('.grain-result').eq(0).find('.grain-stats p').eq(0).contains('Protein: 13')
    cy.get('.grain-result').eq(0).find('.grain-stats p').eq(1).contains('Moisture: 12')
    cy.get('.grain-result').eq(0).find('.grain-stats p').eq(2).contains('Test Weight: 55')
    cy.get('.grain-result').eq(0).find('.grain-stats p').eq(3).contains('Falling Number: 236')

    cy.get('.grain-result').eq(0).find('.farmer-stats img').should('have.class', 'barn-icon')
    cy.get('.grain-result').eq(0).find('.farmer-stats h3').contains('Clark Kent')
    cy.get('.grain-result').eq(0).find('.farmer-stats p').contains('South')

    cy.get('.grain-result button').eq(0).should('have.class', 'view-farm-btn')
    cy.get('.grain-result .view-farm-btn').eq(0).contains('View Details!')
  })

  it('should have a grain card with details and a link for Rye', () => {
    cy.get('.grain-result .grain-name').eq(1).contains('Rye')

    cy.get('.grain-result').eq(1).find('.grain-stats p').should('have.length', 4)
    cy.get('.grain-result').eq(1).find('.grain-stats p').eq(0).contains('Protein: 14')
    cy.get('.grain-result').eq(1).find('.grain-stats p').eq(1).contains('Moisture: 8')
    cy.get('.grain-result').eq(1).find('.grain-stats p').eq(2).contains('Test Weight: 60')
    cy.get('.grain-result').eq(1).find('.grain-stats p').eq(3).contains('Falling Number: 200')

    cy.get('.grain-result').eq(1).find('.farmer-stats img').should('have.class', 'barn-icon')
    cy.get('.grain-result').eq(1).find('.farmer-stats h3').contains('Clark Kent')
    cy.get('.grain-result').eq(1).find('.farmer-stats p').contains('South')

    cy.get('.grain-result button').eq(1).should('have.class', 'view-farm-btn')
    cy.get('.grain-result .view-farm-btn').eq(1).contains('View Details!')
  })

  it('should have a grain card with details and a link for Wheat-Spelt', () => {
    cy.get('.grain-result .grain-name').eq(2).contains('Wheat-Spelt')

    cy.get('.grain-result').eq(2).find('.grain-stats p').should('have.length', 4)
    cy.get('.grain-result').eq(2).find('.grain-stats p').eq(0).contains('Protein: 10')
    cy.get('.grain-result').eq(2).find('.grain-stats p').eq(1).contains('Moisture: 14')
    cy.get('.grain-result').eq(2).find('.grain-stats p').eq(2).contains('Test Weight: 54')
    cy.get('.grain-result').eq(2).find('.grain-stats p').eq(3).contains('Falling Number: 175')

    cy.get('.grain-result').eq(2).find('.farmer-stats img').should('have.class', 'barn-icon')
    cy.get('.grain-result').eq(2).find('.farmer-stats h3').contains('Owen Lars')
    cy.get('.grain-result').eq(2).find('.farmer-stats p').contains('Mountain')

    cy.get('.grain-result button').eq(2).should('have.class', 'view-farm-btn')
    cy.get('.grain-result .view-farm-btn').eq(2).contains('View Details!')
  })
})

describe('filtering results with the search bar', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersGrainResults.json'
      })
    }).as('gqlReq')

    cy.visit('https://wheat-cute.herokuapp.com/grains').wait('@gqlReq')
  })

  it('should keep track of its value in state', () => {
    cy.get('.search-bar').type('R')
    cy.get('.search-bar input').should('have.value', 'R')

    cy.get('.search-bar').type('y')
    cy.get('.search-bar input').should('have.value', 'Ry')

    cy.get('.search-bar').type('e Grain')
    cy.get('.search-bar input').should('have.value', 'Rye Grain')

    cy.get('.search-bar input').clear()
    cy.get('.search-bar input').should('have.value', '')

    cy.get('.search-bar').type('wheat rules')
    cy.get('.search-bar input').should('have.value', 'wheat rules')
  })

  it('should display only the results that match what is typed in', () => {
    cy.get('.search-bar').type('R')

    cy.get('.grain-result').should('have.length', 2)
    cy.get('.grain-result').eq(0).contains('Amaranth')
    cy.get('.grain-result').eq(1).contains('Rye')

    cy.get('.search-bar').type('y')

    cy.get('.grain-result').should('have.length', 1)
    cy.get('.grain-result').eq(0).contains('Rye')
  })

  it('should return results to view as backspaced to empty', () => {
    cy.get('.search-bar').type('Am')

    cy.get('.grain-result').should('have.length', 1)
    cy.get('.grain-result').contains('Amaranth')

    cy.get('.search-bar').type('{backspace}')
    cy.get('.grain-result').should('have.length', 2)
    cy.get('.grain-result').eq(0).contains('Amaranth')
    cy.get('.grain-result').eq(1).contains('Wheat-Spelt')

    cy.get('.search-bar').type('{backspace}')
    cy.get('.search-bar input').should('have.value', '')
    cy.get('.grain-result').should('have.length', 3)
    cy.get('.grain-result').eq(0).contains('Amaranth')
    cy.get('.grain-result').eq(1).contains('Rye')
    cy.get('.grain-result').eq(2).contains('Wheat-Spelt')
  })

  it('should display an error message if no results match the search value', () => {
    cy.get('.grain-result').should('have.length', 3)

    cy.get('.search-bar').type('cat')

    cy.get('.grain-result').should('have.length', 0)
    cy.get('.grains-container p').contains('No grains match the current search. Please start over!')
  })
})

describe('navigation away from the grain results view', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersGrainResults.json'
      })
    }).as('gqlReq')

    cy.visit('https://wheat-cute.herokuapp.com/grains').wait('@gqlReq')
  })

  it('should navigate back to the landing page if the header title is clicked', () => {
    cy.get('.grain-browse-view').should('exist')
    cy.get('.landing-container').should('not.exist')

    cy.url().should('include', '/grains')

    cy.get('header h1').click()

    cy.get('.grain-browse-view').should('not.exist')
    cy.get('.landing-container').should('exist')

    cy.url().should('not.include', '/grains')
  })

  it('should navigate to a farmer profile if a View Details button is clicked', () => {
    cy.get('.grain-browse-view').should('exist')
    cy.get('.farm-profile-container').should('not.exist')

    cy.url().should('include', '/grains')

    // another stub...
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersProfile.json'
      })
    }).as('gqlNewReq')
    
    cy.get('.view-farm-btn').eq(0).click()

    cy.get('.grain-browse-view').should('not.exist').wait('@gqlNewReq')
    cy.get('.farm-profile-container').should('exist')
    cy.get('.farm-name').contains('Clark Kent')

    cy.url().should('not.include', '/grains')
    cy.url().should('include', '/farms/1')
  })
})
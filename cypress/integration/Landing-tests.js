describe('landing page', () => {
  beforeEach(() => {
    // cy.visit('https://wheat-cute.herokuapp.com/')
    cy.visit('http://localhost:3000/')
  })

  it('should have a header with an h1', () => {
    cy.get('.App-header').should('exist')
    cy.get('header h1').contains('Wheatcute')
  })

  it('should have a main with two portals', () => {
    cy.get('main .landing-container').should('exist')
    cy.get('.grains-portal').should('exist')
    cy.get('.farmers-portal').should('exist')
  })

  it('should have a title and a navigation link for the grains portal', () => {
    cy.get('.grains-portal p').contains("Check out some 'saawheat' grains!")

    cy.get('.grains-portal a').should('exist')
    cy.get('.landing-link').eq(0).contains('Connect')
  })

  it('should have a title and two navigation links for the farmers portal', () => {
    cy.get('.farmers-portal p').contains( "Or perhaps you have some grains to peddle?")

    cy.get('.farmers-portal a').should('have.length', 2)
    cy.get('.landing-link').eq(1).contains('New Farm')
    cy.get('.landing-link').eq(2).contains('Existing Farm')
  })
})

describe('navigation away from the landing page view', () => {
  beforeEach(() => {
    // cy.visit('https://wheat-cute.herokuapp.com/')
    cy.visit('http://localhost:3000/')
  })

  it('should navigate to the grain results page if the Connect link is clicked', () => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersGrainResults.json'
      })
    })

    cy.get('.landing-container').should('exist')
    cy.get('.grain-browse-view').should('not.exist')

    cy.url().should('not.include', '/grains')

    cy.get('.grains-portal a').click()

    cy.get('.landing-container').should('not.exist')
    cy.get('.grain-browse-view').should('exist')

    cy.url().should('include', '/grains')
  })

  it('should navigate to the new farm form if the New Farm link is clicked', () => {
    cy.get('.landing-container').should('exist')
    cy.get('.new-profile-farm').should('not.exist')

    cy.url().should('not.include', '/create-farmer')

    cy.get('.farmers-portal a').eq(0).click()

    cy.get('.landing-container').should('not.exist')
    cy.get('.new-profile-form').should('exist')

    cy.url().should('include', '/create-farmer')
  })

  it('should navigate to the farmer results page if the Existing Farm link is clicked', () => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersFarmerResults.json'
      })
    })

    cy.get('.landing-container').should('exist')
    cy.get('.farm-browse-view').should('not.exist')

    cy.url().should('not.include', '/farms')

    cy.get('.farmers-portal a').eq(1).click()

    cy.get('.landing-container').should('not.exist')
    cy.get('.farm-browse-view').should('exist')

    cy.url().should('include', '/farms')
  })

  it('should remain on the landing page if the title is clicked', () => {
    cy.get('.landing-container').should('exist')

    cy.url().should('include', '/')

    cy.get('.App-header h1').click()

    cy.get('.landing-container').should('exist')

    cy.url().should('not.include', '/create-farmer')
    cy.url().should('not.include', '/grains')
    cy.url().should('not.include', '/farms')
    cy.url().should('not.include', '/new-grain')
  })
})
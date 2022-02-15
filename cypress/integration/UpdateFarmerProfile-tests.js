describe('the farmer view of their profile page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersProfile.json'
      })
    })

    cy.visit('https://wheat-cute.herokuapp.com/new-grain/2')
  })

  it('should have a site header with an h1', () => {
    cy.get('.App-header').should('exist')
    cy.get('header h1').contains('Wheatcute')
  })

  it('should have a main with a farm profile container and a return to farms link and add new grain button', () => {
    cy.get('main .update-farmer-view').should('exist')
    cy.get('.update-farmer-view a').contains('Return to Farm List')
    cy.get('.update-farmer-view button').contains('Add a New Grain')
  })

  it('should have a profile header with the farm name and region', () => {
    cy.get('.farmer-view-header').should('exist')

    cy.get('.farmer-view-header .farm-name').contains('Owen Lars')
    cy.get('.farmer-view-header .farm-region').contains('Mountain')
  })

  it('should have a unique farm bio', () => {
    cy.get('.farmer-bio p').contains("Starting a farming rebellion with my wife and nephew. Biosynthesis.")
  })

  it('should have their contact information', () => {
    cy.get('.farmer-info .invitation').should('exist')
    cy.get('.farmer-info .invitation').contains('Reach out to us at:')

    cy.get('.farmer-info p').eq(1).contains('uncleowen@moisturefarms.com')
    cy.get('.farmer-info p').eq(2).contains('555-555-5555')
    cy.get('.farmer-info p').eq(3).contains('5678 Dusty Rd, Tatooine, OK')
  })

  it('should have a container to display their grains', () => {
    cy.get('.farmer-grain-container').should('exist')
    cy.get('.farmer-grain-container h2').contains('Our grains')

    cy.get('.grain-result').should('have.length', 1)
    cy.get('.grain-result h2').contains('Wheat-Spelt')

    cy.get('.grain-result').find('.grain-stats p').should('have.length', 4)
    cy.get('.grain-result').find('.grain-stats p').eq(0).contains('Protein: 10')
    cy.get('.grain-result').find('.grain-stats p').eq(1).contains('Moisture: 14')
    cy.get('.grain-result').find('.grain-stats p').eq(2).contains('Test Weight: 54')
    cy.get('.grain-result').find('.grain-stats p').eq(3).contains('Falling Number: 175')
  })

  it('should have a button to delete a grain', () => {
    cy.get('.grain-result button').contains('Delete Grain')
  })
})

describe('navigation away from the farm update profile view', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersProfile.json'
      })
    })

    cy.visit('https://wheat-cute.herokuapp.com/new-grain/2')
  })

  it('should navigate to back to the landing page if the site title is clicked', () => {
    cy.get('.farm-profile-container').should('exist')
    cy.get('.landing-container').should('not.exist')

    cy.url().should('include', '/new-grain/2')

    cy.get('.App-header h1').click()

    cy.get('.farm-profile-container').should('not.exist')
    cy.get('.landing-container').should('exist')

    cy.url().should('not.include', 'new-grain/2')
  })

  it('should navigate back to the farm results if the Return to Farm List link is clicked', () => {
    cy.get('.farm-profile-container').should('exist')
    cy.get('.farm-browse-view').should('not.exist')

    cy.url().should('not.include', '/farms')

    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersFarmerResults.json'
      })
    })

    cy.get('.update-farmer-view a').click()

    cy.get('.farm-profile-container').should('not.exist')
    cy.get('.farm-browse-view').should('exist')

    cy.url().should('include', '/farms')
  })
})

describe('error message to user in the case of an invalid farmID', () => {
  it('should display an error message if the id does not exist', () => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersProfile.json'
      })
    })

    cy.visit('https://wheat-cute.herokuapp.com/new-grain/cat')

    cy.get('.App-header h1').contains('Wheatcute')

    cy.get('.profile-error').should('exist')
    cy.get('.profile-error').contains("404: Sorry, no farm with and id of 'cat' exists.")
  })
})

describe('new grain modal', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersProfile.json'
      })
    })
    
    cy.visit('https://wheat-cute.herokuapp.com/new-grain/1')
  })
  
  it('should be able to open the new-grain form modal', () => {
    cy.get('.new-grain-modal').should('not.exist')
    cy.get('.nav-btn-container button').click()
    cy.get('.new-grain-modal').should('exist')
  })
  
  it('should be able to close the modal', () => {
    cy.get('.new-grain-modal').should('not.exist')
    cy.get('.nav-btn-container button').click()
    cy.get('.new-grain-modal').should('exist')
    cy.get('.new-grain-modal button').eq(0).contains('Close')
    cy.get('.new-grain-modal button').eq(0).click()
    cy.get('.new-grain-modal').should('not.exist')
  })
})
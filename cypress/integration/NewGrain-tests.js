describe('new grain form', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersProfile.json'
      })
    })

    cy.visit('https://wheat-cute.herokuapp.com/new-grain/1')
    cy.get('.update-farmer-nav-btn').eq(1).click()
  })

  it('the popup form should have 6 fields and a button to exit the popup', () => {
    cy.get('.new-grain-container').should('exist')
    cy.get('.new-grain-form').should('exist')

    cy.get('form label').should('have.length', 6)
    cy.get('form input').should('have.length', 6)

    cy.get('.new-grain-modal button').eq(0).contains('Close')
  })

  it('should have a label and input for the Grain Name', () => {
    cy.get('.new-grain-form label').eq(0).contains('Grain name/type: *')
    cy.get('.new-grain-form input').eq(0).should('have.attr', 'required')
    cy.get('.new-grain-form input').eq(0).should('have.attr', 'placeholder', 'Turkey Red Wheat')
  })

  it('should have a label and input for the Protein', () => {
    cy.get('.new-grain-form label').eq(1).contains('Protein: *')
    cy.get('.new-grain-form input').eq(1).should('have.attr', 'required')
    cy.get('.new-grain-form input').eq(1).should('have.attr', 'placeholder', '12.0')
  })

  it('should have a label and input for the Test Weight', () => {
    cy.get('.new-grain-form label').eq(2).contains('Test Weight: *')
    cy.get('.new-grain-form input').eq(2).should('have.attr', 'required')
    cy.get('.new-grain-form input').eq(2).should('have.attr', 'placeholder', '60')
  })

  it('should have a label and input for the Moisture', () => {
    cy.get('.new-grain-form label').eq(3).contains('Moisture: *')
    cy.get('.new-grain-form input').eq(3).should('have.attr', 'required')
    cy.get('.new-grain-form input').eq(3).should('have.attr', 'placeholder', '11.5')
  })

  it('should have a label and input with options for the Falling Number', () => {
    cy.get('.new-grain-form label').eq(4).contains('Falling Number: *')
    cy.get('.new-grain-form input').eq(4).should('have.attr', 'required')
    cy.get('.new-grain-form input').eq(4).should('have.attr', 'placeholder', '300')
  })

  it('should have a label and input for any Notes', () => {
    cy.get('.new-grain-form label').eq(5).contains('Any notes to share on this grain:')
    cy.get('.new-grain-form input').eq(5).should('have.attr', 'placeholder', 'Description or other notes')
  })

  it('should have a submit button', () => {
    cy.get('.new-grain-form button').should('exist')
    cy.get('.profile-submit-btn').contains('Submit')
  })
})

describe('form functionality', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersProfile.json'
      })
    })

    cy.visit('https://wheat-cute.herokuapp.com/new-grain/1')
    cy.get('.update-farmer-nav-btn').eq(1).click()
  })

  it('should keep Grain Name input value in state', () => {
    cy.get('.new-grain-form input').eq(0).should('have.value', '')
    cy.get('.new-grain-form input').eq(0).type('Rye')
    cy.get('.new-grain-form input').eq(0).should('have.value', 'Rye')
    cy.get('.new-grain-form input').eq(0).clear('')
    cy.get('.new-grain-form input').eq(0).should('have.value', '')
  })

  it('should keep Protein input value in state', () => {
    cy.get('.new-grain-form input').eq(1).should('have.value', '')
    cy.get('.new-grain-form input').eq(1).type('12')
    cy.get('.new-grain-form input').eq(1).should('have.value', '12')
    cy.get('.new-grain-form input').eq(1).clear('')
    cy.get('.new-grain-form input').eq(1).should('have.value', '')
  })

  it('should keep Test Weight input value in state', () => {
    cy.get('.new-grain-form input').eq(2).should('have.value', '')
    cy.get('.new-grain-form input').eq(2).type('54')
    cy.get('.new-grain-form input').eq(2).should('have.value', '54')
    cy.get('.new-grain-form input').eq(2).clear('')
    cy.get('.new-grain-form input').eq(2).should('have.value', '')
  })

  it('should keep Moisture input value in state', () => {
    cy.get('.new-grain-form input').eq(3).should('have.value', '')
    cy.get('.new-grain-form input').eq(3).type('11.5')
    cy.get('.new-grain-form input').eq(3).should('have.value', '11.5')
    cy.get('.new-grain-form input').eq(3).clear('')
    cy.get('.new-grain-form input').eq(3).should('have.value', '')
  })

  it('should keep Falling Number input value in state', () => {
    cy.get('.new-grain-form input').eq(4).should('have.value', '')
    cy.get('.new-grain-form input').eq(4).type('320')
    cy.get('.new-grain-form input').eq(4).should('have.value', '320')
    cy.get('.new-grain-form input').eq(4).clear('')
    cy.get('.new-grain-form input').eq(4).should('have.value', '')
  })

  it('should keep Notes input value in state', () => {
    cy.get('.new-grain-form input').eq(5).should('have.value', '')
    cy.get('.new-grain-form input').eq(5).type('This great tastes like cinnamon.')
    cy.get('.new-grain-form input').eq(5).should('have.value', 'This great tastes like cinnamon.')
    cy.get('.new-grain-form input').eq(5).clear('')
    cy.get('.new-grain-form input').eq(5).should('have.value', '')
  })

  it('should not clear inputs when submit is clicked if required fields are empty', () => {
    cy.get('.new-grain-form input').eq(0).type('White Sonora Wheat')
    cy.get('.new-grain-form input').eq(0).should('have.value', 'White Sonora Wheat')
    cy.get('.profile-submit-btn').click()
    cy.get('.new-grain-form input').eq(0).should('have.value', 'White Sonora Wheat')

    cy.get('.new-grain-form input').eq(1).type('13.5')
    cy.get('.new-grain-form input').eq(1).should('have.value', '13.5')
    cy.get('.profile-submit-btn').click()
    cy.get('.new-grain-form input').eq(0).should('have.value', 'White Sonora Wheat')
    cy.get('.new-grain-form input').eq(1).should('have.value', '13.5')

    cy.get('.new-grain-form input').eq(2).type('54')
    cy.get('.new-grain-form input').eq(3).type('11.5')
    cy.get('.new-grain-form input').eq(5).type('This great tastes like cinnamon.')
    cy.get('.profile-submit-btn').click()
    cy.get('.new-grain-form input').eq(0).should('have.value', 'White Sonora Wheat')
    cy.get('.new-grain-form input').eq(1).should('have.value', '13.5')
    cy.get('.new-grain-form input').eq(2).should('have.value', '54')
    cy.get('.new-grain-form input').eq(3).should('have.value', '11.5')
    cy.get('.new-grain-form input').eq(4).should('have.value', '')
    cy.get('.new-grain-form input').eq(5).should('have.value', 'This great tastes like cinnamon.')
  })

  it('should give an error message if not all required fields are filled with a click on the submit', () => {
    cy.get('.new-grain-form input').eq(0).type('White Sonora Wheat')
    cy.get('.new-grain-form').contains('Please fill out all required fields.').should('not.exist')
    cy.get('.profile-submit-btn').click()
    cy.get('.new-grain-form').contains('Please fill out all required fields.')
  })

  it.skip('should clear inputs and close popup when submit is clicked if required fields have value', () => {
    cy.get('.new-grain-form input').eq(0).type('Red Fife Wheat')
    cy.get('.new-grain-form input').eq(1).type('14.5')
    cy.get('.new-grain-form input').eq(2).type('54')
    cy.get('.new-grain-form input').eq(3).type('11.5')
    cy.get('.new-grain-form input').eq(4).type('320')
    cy.get('.new-grain-form input').eq(5).type('Performs great in bread!')
    cy.get('.new-grain-container').should('exist')
    cy.url().should('include', '/new-grain')
    cy.get('.profile-submit-btn').click()
    cy.get('.new-grain-container').should('not.exist')
    cy.url().should('include', '/new-grain')
  })
})

describe('navigation away from the new grain form', () => {
  it('should remain on the farmer profile view when the popup is closed', () => {
    cy.intercept('POST', 'https://wheat-cute-api.herokuapp.com/graphql', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'allFarmersProfile.json'
      })
    })

    cy.visit('https://wheat-cute.herokuapp.com/new-grain/1')
    cy.get('.update-farmer-nav-btn').eq(1).click()

    cy.get('.update-farmer-view').should('exist')
    cy.get('.new-grain-form').should('exist')

    cy.url().should('include', '/new-grain')

    cy.get('.close-modal-btn').eq(0).click()

    cy.get('.update-farmer-view').should('exist')
    cy.get('.new-grain-form').should('not.exist')

    cy.url().should('include', '/new-grain')
  })
})
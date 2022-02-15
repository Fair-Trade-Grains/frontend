describe('new farm form', () => {
  beforeEach(() => {
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

  it('should have a label and input for the NAME', () => {
    cy.get('.new-farm-form label').eq(0).contains("Your name or your farm's name: *required*")
    cy.get('.new-farm-form input').eq(0).should('have.attr', 'required')
    cy.get('.new-farm-form input').eq(0).should('have.attr', 'placeholder', 'Smith Family Farm')
  })

  it('should have a label and input for the EMAIL', () => {
    cy.get('.new-farm-form label').eq(1).contains("Your business email: *required*")
    cy.get('.new-farm-form input').eq(1).should('have.attr', 'required')
    cy.get('.new-farm-form input').eq(1).should('have.attr', 'placeholder', 'example@email.com')
  })

  it('should have a label and input for the PHONE', () => {
    cy.get('.new-farm-form label').eq(2).contains("Your business phone number:")
    cy.get('.new-farm-form input').eq(2).should('not.have.attr', 'required')
    cy.get('.new-farm-form input').eq(2).should('have.attr', 'placeholder', '(xxx) xxx - xxxx')
  })

  it('should have a label and input for the ADDRESS', () => {
    cy.get('.new-farm-form label').eq(3).contains("Your business address:")
    cy.get('.new-farm-form input').eq(3).should('not.have.attr', 'required')
    cy.get('.new-farm-form input').eq(3).should('have.attr', 'placeholder', '123 County Road, Denver, CO, 12345')
  })

  it('should have a label and select with options for the REGION', () => {
    cy.get('.new-farm-form label').eq(4).contains("Select your region (see the reference map above this form): *required*")
    cy.get('.new-farm-form select').should('have.attr', 'required')
    cy.get('.new-farm-form select').find('option').should('have.length', 13)
    cy.get('.new-farm-form option').eq(0).contains('~~ Please choose an option ~~')
    cy.get('.new-farm-form option').eq(1).should('have.value', 'Northeastern')
    cy.get('.new-farm-form option').eq(12).should('have.value', 'Pacific')
  })

  it('should have a label and textarea for the BIO', () => {
    cy.get('.new-farm-form label').eq(5).contains("Personal and/or farm bio: *required*")
    cy.get('.new-farm-form textarea').should('have.attr', 'required')
    cy.get('.new-farm-form textarea').should('have.attr', 'placeholder', 'Tell us a little about your organization and your farming practices! (1000 characters or less)')
  })

  it('should have a label and file input for the PHOTO', () => {
    cy.get('.new-farm-form label').eq(6).contains("Add a photo:")
    cy.get('.new-farm-form input').eq(4).should('not.have.attr', 'required')
    cy.get('.new-farm-form input').eq(4).should('have.attr', 'accept', 'image/png, image/jpeg')
  })

  it('should have a submit button', () => {
    cy.get('.new-farm-form button').should('exist')
    cy.get('.profile-submit-btn').contains('Submit')
  })
})

describe('pop up modal with regions map', () => {
  beforeEach(() => {
    // cy.visit('https://wheat-cute.herokuapp.com/create-farmer')
    cy.visit('http://localhost:3000/create-farmer')
  })
  
  it('should be able to open a pop up modal', () => {
    cy.get('.map-modal-container').should('not.exist')
    cy.get('.new-profile-form button').contains('See map of the regions!')
    cy.get('.new-profile-form button').eq(0).click()
    cy.get('.map-modal-container').should('exist')
  })

  it('should have a farming regions map on the modal', () => {
    cy.get('.new-profile-form button').eq(0).click()
    cy.get('.map-modal-container img').should('have.attr', 'alt', 'USDA Agriculture Regions Map')
  })

  it('should be able to close the pop up modal', () => {
    cy.get('.new-profile-form button').contains('See map of the regions!')
    cy.get('.new-profile-form button').eq(0).click()
    cy.get('.map-modal-container').should('exist')
    cy.get('.map-modal-container button').contains('Close')
    cy.get('.map-modal-container button').click()
    cy.get('.map-modal-container').should('not.exist')
  })
})

describe('form functionality', () => {
  beforeEach(() => {
    // cy.visit('https://wheat-cute.herokuapp.com/create-farmer')
    cy.visit('http://localhost:3000/create-farmer')
  })

  it('should keep NAME input value in state', () => {
    cy.get('.new-farm-form input').eq(0).should('have.value', '')
    cy.get('.new-farm-form input').eq(0).type('John')
    cy.get('.new-farm-form input').eq(0).should('have.value', 'John')
    cy.get('.new-farm-form input').eq(0).clear('')
    cy.get('.new-farm-form input').eq(0).should('have.value', '')
  })

  it('should keep EMAIL input value in state', () => {
    cy.get('.new-farm-form input').eq(1).should('have.value', '')
    cy.get('.new-farm-form input').eq(1).type('jane@farm.com')
    cy.get('.new-farm-form input').eq(1).should('have.value', 'jane@farm.com')
    cy.get('.new-farm-form input').eq(1).clear('')
    cy.get('.new-farm-form input').eq(1).should('have.value', '')
  })

  it('should keep PHONE input value in state', () => {
    cy.get('.new-farm-form input').eq(2).should('have.value', '')
    cy.get('.new-farm-form input').eq(2).type('123 - 123 - 4321')
    cy.get('.new-farm-form input').eq(2).should('have.value', '123 - 123 - 4321')
    cy.get('.new-farm-form input').eq(2).clear('')
    cy.get('.new-farm-form input').eq(2).should('have.value', '')
  })

  it('should keep ADDRESS input value in state', () => {
    cy.get('.new-farm-form input').eq(3).should('have.value', '')
    cy.get('.new-farm-form input').eq(3).type('2022 Dusty Lane, Somewhere')
    cy.get('.new-farm-form input').eq(3).should('have.value', '2022 Dusty Lane, Somewhere')
    cy.get('.new-farm-form input').eq(3).clear('')
    cy.get('.new-farm-form input').eq(3).should('have.value', '')
  })

  it('should keep REGION select value in state', () => {
    cy.get('.new-farm-form select').should('have.value', '')
    cy.get('.new-farm-form select').select('Southern')
    cy.get('.new-farm-form select').should('have.value', 'Southern')
    cy.get('.new-farm-form select').select('Delta')
    cy.get('.new-farm-form select').should('have.value', 'Delta')
    cy.get('.new-farm-form select').select('Southern Plains')
    cy.get('.new-farm-form select').should('have.value', 'Southern Plains')
  })

  it('should keep BIO textarea value in state', () => {
    cy.get('.new-farm-form textarea').should('have.value', '')
    cy.get('.new-farm-form textarea').type('Hello world. We grow grain.')
    cy.get('.new-farm-form textarea').should('have.value', 'Hello world. We grow grain.')
    cy.get('.new-farm-form textarea').clear('')
    cy.get('.new-farm-form textarea').should('have.value', '')
  })

  it('should keep PHOTO file path value in state', () => {
    cy.get('.new-farm-form input').eq(4).should('have.value', '')
    cy.get('.new-farm-form input').eq(4).selectFile('src/assets/wheatField.png')
    cy.get('.new-farm-form input').eq(4).should('have.value', 'C:\\fakepath\\wheatField.png')
  })

  it('should not clear inputs when submit is clicked if required fields are empty', () => {
    cy.get('.new-farm-form input').eq(0).type('Farmer John')
    cy.get('.new-farm-form input').eq(0).should('have.value', 'Farmer John')
    cy.get('.profile-submit-btn').click()
    cy.get('.new-farm-form input').eq(0).should('have.value', 'Farmer John')

    cy.get('.new-farm-form input').eq(1).type('farmingGuy001@gmail.com')
    cy.get('.new-farm-form input').eq(1).should('have.value', 'farmingGuy001@gmail.com')
    cy.get('.profile-submit-btn').click()
    cy.get('.new-farm-form input').eq(1).should('have.value', 'farmingGuy001@gmail.com')

    cy.get('.new-farm-form select').select('Great Lakes')
    cy.get('.new-farm-form select').should('have.value', 'Great Lakes')
    cy.get('.profile-submit-btn').click()
    cy.get('.new-farm-form select').should('have.value', 'Great Lakes')
  })

  it('should give an error message if not all required fields are filled with a click on the submit', () => {
    cy.get('.new-farm-form input').eq(0).type('Farmer John')
    cy.get('.new-farm-form input').eq(1).type('farmingGuy001@gmail.com')
    cy.get('.new-farm-form').contains('Please fill out all required fields.').should('not.exist')
    cy.get('.profile-submit-btn').click()
    cy.get('.new-farm-form').contains('Please fill out all required fields.')
  })

  it.skip('should clear inputs and redirect user when submit is clicked if required fields have value', () => {
    cy.get('.new-farm-form input').eq(0).type('Farmer John')
    cy.get('.new-farm-form input').eq(1).type('farmingGuy001@gmail.com')
    cy.get('.new-farm-form select').select('Great Lakes')
    cy.get('.new-farm-form textarea').type("We are a biodynamic farm growing rye and raising buffalo.")
    cy.url().should('include', '/create-farmer')
    cy.get('.profile-submit-btn').click()
    cy.url().should('include', '/farms')
  })
})

describe('navigation away from the new farm form', () => {
  it('should navigate back to the landing page if the header title is clicked', () => {
    // cy.visit('https://wheat-cute.herokuapp.com/create-farmer')
    cy.visit('http://localhost:3000/create-farmer')

    cy.get('.new-profile-form').should('exist')
    cy.get('.landing-container').should('not.exist')

    cy.url().should('include', '/create-farmer')

    cy.get('header h1').click()

    cy.get('.new-profile-form').should('not.exist')
    cy.get('.landing-container').should('exist')

    cy.url().should('not.include', '/create-farmer')
  })
})
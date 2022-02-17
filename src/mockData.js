const data = {
  farms: [
    {
      id: 1,
      name: 'Star Farm',
      email: 'starfarm@gmail.com',
      business_phone: '111-222-3333',
      address: '123 First Lane, Oxford, KS, 12312',
      region: 'Midwest',
      bio: 'Our farm is blah blah blah blah. We words words words words. More words just to see the space filled up a little. This farmer likes growing grains.',
      photo_path: './assets/wheatField.png'
    },
    {
      id: 2,
      name: 'Mountain Farm',
      email: 'mountainfarm@gmail.com',
      business_phone: '111-222-3333',
      address: '456 First Lane, Lyons, CO, 12345',
      region: 'Rocky Mountains',
      bio: 'Our farm is blah blah blah blah. We words words words words. More words just to see the space filled up a little. This farmer likes growing grains.',
      photo_path: './assets/wheatField.png'
    },
    {
      id: 3,
      name: 'Ancient Seed Farm',
      email: 'ancientSeedFarm@gmail.com',
      business_phone: '111-222-3333',
      address: '111 Co Rd T, Holyoake, CO, 54321',
      region: 'Rocky Mountains',
      bio: 'Our farm is blah blah blah blah. We words words words words. More words just to see the space filled up a little. This farmer likes growing grains.',
      photo_path: './assets/wheatField.png'
    }
  ],
  grains: [
    {
      id: 1,
      farm_id: 1,
      name: 'Abruzzi Rye',
      moisture: 13,
      protein: 12.5,
      falling_number: 300,
      test_weight: 56,
      farmers_notes: 'Fantastic earthy-cinnamony flavor!'
    },
    {
      id: 2,
      farm_id: 1,
      name: 'Tibetan Hulless Barley',
      moisture: 14.5,
      protein: 15,
      falling_number: 300,
      test_weight: 48,
      farmers_notes: 'Beautiful plump berries.'
    },
    {
      id: 3,
      farm_id: 2,
      name: 'Turkey Red Wheat',
      moisture: 13.5,
      protein: 12.5,
      falling_number: 325,
      test_weight: 60,
      farmers_notes: 'Hard Red Winter Wheat'
    },
    {
      id: 4,
      farm_id: 2,
      name: 'White Sonora Wheat',
      moisture: 13,
      protein: 10.5,
      falling_number: 300,
      test_weight: 58,
      farmers_notes: 'Soft White Winter Wheat'
    },
    {
      id: 5,
      farm_id: 3,
      name: 'Red Fife Wheat',
      moisture: 12,
      protein: 14,
      falling_number: 290,
      test_weight: 58,
      farmers_notes: 'Hard Red Winter Wheat'
    }
  ]
}

export default data
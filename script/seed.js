'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'cody1@email.com', password: '12345'})
  ])

  const product = await Promise.all([
    Product.create({
      name: 'Dramatic Entrance',
      description:
        "Crash your ex-lover's wedding via parachute, liven up a funeral by giving your eulogy after emerging from inside the coffin, pick up your high school diploma from the back of a gleaming white horse. If you want to pull focus and BE the one everyone is looking at, look no further!",
      price: 50
    }),
    Product.create({
      name: 'Evil Twin',
      description:
        "Like looking in a human mirror, except EVIL! This identical human being will make you look like an incredible human being by comparison. All kinds of shenanigans may ensue before your friends and family catch on that there's TWO of you now!",
      price: 250
    }),
    Product.create({
      name: 'Back from the Dead',
      description:
        'The next generation of our insanely popular Now They\'ll Be Sorry, package, Back From The Dead" allows you to enjoy all the grief and regret felt by your network at your passing, combined with the most dramatic entrance of them all.',
      price: 500
    }),
    Product.create({
      name: 'Love Triangle',
      description:
        "It's a classic for a reason! This is an imbroglio for you and one of your most drama-thirsty single friends.",
      price: 80
    }),
    Product.create({
      name: 'Evil Stepmother',
      description:
        'Feel like Cinderella at the beginning of the story with one of our vindictive and exacting evil stepmoms. She\'s a part of your family now and there\'s nothing you can do about it! Toil away getting the house ready for her weird bookclub friends, partake in the different and bad ways she wants to celebrate holidays, and just generally have your space invaded by "Carol".',
      price: 240
    }),
    Product.create({
      name: 'Chased by a Mob',
      description:
        "Who's that person? Why are they being chased down the street by a huge mob?! Are they an angry mob, or do they just want to bathe in the star power of someone famous? YOU DECIDE! We work with you to craft your perfect mob scenario so you can live it instead of just dreaming about it all the time!",
      price: 75
    }),
    Product.create({
      name: 'In Love with a Criminal',
      description:
        'The Cadillac of dramatic living, nothing says, "I make big, rash decisions that will end in ruin," more than falling in love with someone who is terrible for you! Also you just met them last night and you\'re married now! Oh, did I mention they\'re wanted by the FBI for forging government documents? Laura from work is going to eat this up',
      price: 1000
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${product.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

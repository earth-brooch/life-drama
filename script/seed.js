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

    Product.create({name: 'Dramatic Entrance', price: 50}),
    Product.create({name: 'Evil Twin', price: 250}),
    Product.create({name: 'Back from the Dead', price: 500}),
    Product.create({name: 'Love Triangle', price: 80}),
    Product.create({name: 'Evil Stepmother', price: 240}),
    Product.create({name: 'Chased by a Mob', price: 75}),
    Product.create({name: 'In Love with a Criminal', price: 1000})
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

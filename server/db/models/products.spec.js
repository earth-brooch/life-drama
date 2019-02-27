/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  beforeEach(async () => {
    const product1 = await Product.create({
      name: 'Bachelorette Rose'
    })

    describe('Product Data', () => {
      it('has a name', () => {
        expect(product1.name.to.equal('Bachelorette Rose'))
      })

      it('has a default price', () => {
        expect(product1.price.to.equal(5.0))
      })
    })
  })
})

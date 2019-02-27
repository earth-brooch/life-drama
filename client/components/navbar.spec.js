import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Navbar} from './navbar'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Navbar', () => {
  let navbar

  beforeEach(() => {
    navbar = shallow(<Navbar />)
  })

  it('links to the login page', () => {
    //     expect(navbar.find('href')).to.be.equal('/login')
    expect(navbar.find(`a[href='/login']`)).to.be.present()
  })

  it('links to the sign-up page', () => {
    expect(navbar.find('href')).to.be.equal('/signup')
  })

  it("links to all the products if you aren't signed in", () => {
    expect(navbar.find('href').text()).to.be.equal('/')
  })
})

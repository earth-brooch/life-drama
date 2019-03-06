/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
//import 'bootstrap/dist/css/bootstrap.min.css'

export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as AllProducts} from './AllProducts'
export {default as Cart} from './cart'
export {default as Checkout} from './checkout'
export {default as OrderHistory} from './OrderHistory'
export {Login, Signup} from './auth-form'
export {default as Page404} from './Page404'

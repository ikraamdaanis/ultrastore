import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Footer, Header, ScrollToTop } from './components'
import { Container } from 'react-bootstrap'
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  ProductScreen,
  ProfileScreen,
  RegisterScreen,
  ShippingScreen,
} from './screens'

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/register' component={RegisterScreen} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/product/:id' component={ProductScreen} exact />
          <Route path='/cart/:id?' component={CartScreen} exact />
          <Route path='/shipping' component={ShippingScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Footer, Header, ScrollToTop } from './components'
import { Container } from 'react-bootstrap'
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  OrderListScreen,
  OrderScreen,
  PaymentScreen,
  PlaceOrderScreen,
  ProductEditScreen,
  ProductListScreen,
  ProductScreen,
  ProfileScreen,
  RegisterScreen,
  ShippingScreen,
  UserEditScreen,
  UserListScreen,
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
          <Route path='/payment' component={PaymentScreen} exact />
          <Route path='/placeorder' component={PlaceOrderScreen} exact />
          <Route path='/order/:id' component={OrderScreen} exact />
          <Route path='/admin/users' component={UserListScreen} exact />
          <Route path='/admin/users/:id/edit' component={UserEditScreen} exact />
          <Route path='/admin/products' component={ProductListScreen} exact />
          <Route path='/admin/products/:id/edit' component={ProductEditScreen} exact />
          <Route path='/admin/orders' component={OrderListScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

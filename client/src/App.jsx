import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Footer, Header, ScrollToTop } from './components'
import { Container } from 'react-bootstrap'
import { CartScreen, HomeScreen, ProductScreen } from './screens'

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} exact />
          <Route path='/cart/:id?' component={CartScreen} exact />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

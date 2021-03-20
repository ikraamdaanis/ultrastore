import React from 'react'
import { Footer, Header } from './components'
import { Container } from 'react-bootstrap'
import { HomeScreen } from './screens'

export const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  )
}

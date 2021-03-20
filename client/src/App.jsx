import React from 'react'
import { Footer, Header } from './components'
import { Container } from 'react-bootstrap'

export const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to UltraTech</h1>
        </Container>
      </main>
      <Footer />
    </>
  )
}

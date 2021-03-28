import React from 'react'
import { logout } from '../state'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useHistory } from 'react-router'

export const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/' style={{ cursor: 'pointer' }}>
            <h3 className='logo'>UltraStore</h3>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <span className='icon-wrapper'>
                    <span className='icon-container'>
                      <span className='icon'>
                        <i className='fas fa-shopping-cart'></i>
                      </span>
                      <span className='profile-link'>Cart</span>
                    </span>
                  </span>
                </Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={
                    <span className='icon-wrapper'>
                      <span className='icon-container'>
                        <span className='icon'>
                          <i className='fas fa-user-lock'></i>
                        </span>
                        <span className='profile-link'>Admin</span>
                      </span>
                    </span>
                  }
                  id='admin'
                >
                  <LinkContainer to='/admin/users'>
                    <NavDropdown.Item>
                      <div className='icon-container'>
                        <span className='icon'>
                          <i className='fas fa-users-cog'></i>
                        </span>
                        <span>Users</span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/products'>
                    <NavDropdown.Item>
                      <div className='icon-container'>
                        <span className='icon'>
                          <i className='fas fa-list-ul'></i>
                        </span>
                        <span>Products</span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orders'>
                    <NavDropdown.Item>
                      <div className='icon-container'>
                        <span className='icon'>
                          <i className='fas fa-truck-loading'></i>
                        </span>
                        <span>Orders</span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown
                  title={
                    <span className='icon-wrapper'>
                      <span className='icon-container'>
                        <span className='icon'>
                          <i className='fas fa-user'></i>
                        </span>
                        <span className='profile-link'>{userInfo.name}</span>
                      </span>
                    </span>
                  }
                  id='username'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <>
                        <div className='icon-container'>
                          <span className='icon'>
                            <i className='fas fa-user'></i>
                          </span>
                          <span>Profile</span>
                        </div>
                      </>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <>
                      <div className='icon-container'>
                        <span className='icon'>
                          <i className='fas fa-sign-out-alt'></i>
                        </span>
                        <span>Logout</span>
                      </div>
                    </>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

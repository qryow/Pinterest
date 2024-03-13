import React, { FC, useEffect, useState } from 'react'
import AuthNavbar from './AuthNavbar'
import { WithAuthorize } from '../../../helpers/hocs/WithAuthorize'
import { isUserLogin } from '../../../helpers/functions'
import UnAuthNavbar from './UnAuthNavbar'
import { useLocation } from 'react-router-dom'

const Navbar: FC = () => {
  const [isLogin, setIsLogin] = useState(isUserLogin());
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/home') {
      setIsLogin(isUserLogin()) 
    }
  }, [location])

  const NavbarWithAuthorize = WithAuthorize(isLogin, {
    ComponentForAuthorized: AuthNavbar,
    ComponentForUnauthorized: UnAuthNavbar
  });
  return (
    <>
      <NavbarWithAuthorize />
    </>
  )
}

export default Navbar
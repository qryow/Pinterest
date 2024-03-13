import React, { FC, useEffect } from 'react'
import { isUserLogin } from '../helpers/functions';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const WelcomePage: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const isLogin = isUserLogin();

  useEffect(() => {
    if(isLogin) {
      navigate('/home')
    }
  }, [isLogin])
  return (
    <div>WelcomePage</div>
  )
}

export default WelcomePage
import React, { useEffect, useState } from 'react'
import MainRoutes from './routes/MainRoutes'
import Navbar from './ui/components/Navbar/Navbar'
import { WithAuthorize } from './helpers/hocs/WithAuthorize'
import UnAuthNavbar from './ui/components/Navbar/UnAuthNavbar'
import AuthNavbar from './ui/components/Navbar/AuthNavbar'
import { isUserLogin } from './helpers/functions'

const App = () => {
  //const [isLogin, setIsLogin] = useState(false);

  //useEffect(() => {
  //  const intervalId = setInterval(() => {
  //    const updatedIsLogin = isUserLogin();
  //    if (updatedIsLogin !== isLogin) {
  //      setIsLogin(updatedIsLogin);
  //    }
  //  }, 1000);

  //  return () => clearInterval(intervalId);
  //}, []);

  return (
    <>
      <Navbar />
      <MainRoutes />
    </>
  )
}

export default App



//! Надо типизировать в отдельном интерфейсе а не внутри аргументов
//! не надо использовать фрагмент где лишь один элемент 
//! надо использовать selector в отдельном модуле 
//! надо useEffect вызывыать в самом конце до return
//! надо state типизировать либо везде, либо ввобше не типизировать
//! использовать БЭМ и стараться писать мало классов
//! использовать малоналоженности, как миниму 3 и не больше (стили)
//! использовать лучше константы для условного ветвления чем просто проверки
//! надо пути для навигации использовать в отдельных в константах чем писать пути в ручную
//! надо убирать ненужные импорты так как они жрут память
//! использовать формы для состояние и инпутов чем создавать отдельные состояния
//! svg можно в отдельном компоненте юзать



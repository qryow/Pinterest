import React from 'react'
import style from '../styles/ui/navbar.module.scss'
import logoNotLogin from '../assets/Icons/LogoWithText.svg'
import logo from '../assets/Icons/Logo.svg'
const NavbarForStoriies = ({ isAuth }) => {
  return (
    <nav className={style.nav}>
      <div className={style.nav__wrapper}>
        {!isAuth ? (<>
          <div className={style.nav__logo_notLogin}>
            <div className={style.nav__logo_wrapper}>
              <img src={logoNotLogin} alt="" />
            </div>
            <ul className={style.nav__menu}>
              <li>Today</li>
              <li>Watch</li>
              <li>Shop</li>
              <li>Explore</li>
            </ul>
          </div>
          <div className={style.nav__accountNotLogin}>
            <ul className={style.acc__menu}>
              <li>Description</li>
              <li>Business</li>
              <li>Blog</li>
            </ul>

            <div className={style.acc__btns}>
              <button className={style.acc__btn}>Log in</button>
              <button className={style.acc__btn2}>Sign in</button>
            </div>
          </div>
        </>) : (<>
          <div className={style.nav__logo}>
            <div className={style.logo__wrapper}>
              <img src={logo} alt="" />
            </div>
            <div className={style.button__wrapper}>
              <button>Главная</button>
              <button className={style.active}>Создать</button>
            </div>
          </div>

          <div className={style.nav__search}>
            <svg className="gUZ ztu U9O kVc" height="16" width="16" viewBox="0 0 24 24" aria-label="Значок поиска" role="img"><path d="M10 16a6 6 0 1 1 .01-12.01A6 6 0 0 1 10 16m13.12 2.88-4.26-4.26a10 10 0 1 0-4.24 4.24l4.26 4.26a3 3 0 1 0 4.24-4.24"></path></svg>
            <input placeholder='Поиск' type="text" />
          </div>

          <div className={style.nav__account}>
            <div className={style.item__wrapper}>
              <svg className="gUZ ztu U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M19 7v6.17A10 10 0 0 1 22 19H2a10 10 0 0 1 3-5.83V7a7 7 0 1 1 14 0m-4 14a3 3 0 1 1-6 0z"></path></svg>
            </div>
            <div className={style.item__wrapper}>
            <svg className="Hn_ gUZ ztu U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M18 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M12 0a11 11 0 0 0-8.52 17.95l-1.46 5.43a.5.5 0 0 0 .73.55l5.08-2.75A10.98 10.98 0 0 0 23 11 11 11 0 0 0 12 0"></path></svg>
            </div>
              {isAuth ? (
                <div className={style.item__wrapper}>
                  <div className={style.item__avatar}>
                    <img src='https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg' alt="" />
                  </div>
                </div>
              ) : (
                <div className={style.item__wrapper}>
                  <div className={style.item__avatar}></div>
                </div>
              )}
            <div className={style.item__wrapper}>
            <svg className="gUZ ztu U9O kVc" height="12" width="12" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0"></path></svg>
            </div>
          </div>
        </>)}
      </div>
    </nav>
  )
}

export default NavbarForStoriies
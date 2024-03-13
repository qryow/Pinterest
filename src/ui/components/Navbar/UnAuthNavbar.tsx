import React, { useState } from 'react'
import style from '../../../styles/ui/navbar.module.scss'
import logoNotLogin from '../../../assets/Icons/LogoWithText.svg'
import { Modal } from '../../blocks/Modals/Modal'
import AuthModal from '../../blocks/Modals/AuthModal'
import { authEnum } from '../../../types/modalTypes'

const UnAuthNavbar = () => {
  let [regModal, setRegModal] = useState(false);
  let [logModal, setLogModal] = useState(false);
  return (
    <>
      <nav className={style.nav}>
        <div className={style.nav__wrapper}>
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
              <button className={style.acc__btn} onClick={() => setLogModal(true)}>Log in</button>
              <button className={style.acc__btn2} onClick={() => setRegModal(true)}>Sign in</button>
            </div>
          </div>
        </div>
      </nav>
      <Modal>
        {regModal ? (
          <AuthModal active={regModal} setActive={setRegModal} authName={authEnum.register} />
            ) : (
          <AuthModal active={logModal} setActive={setLogModal} authName={authEnum.login} />
        )}
    </Modal>
    </>
  )
}

export default UnAuthNavbar
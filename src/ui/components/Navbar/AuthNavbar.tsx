import React, { useEffect, useState } from 'react'
import style from '../../../styles/ui/navbar.module.scss'
import logo from '../../../assets/Icons/Logo.svg'
import { useNavigate } from 'react-router-dom'
import AccMiniModal from '../../blocks/Modals/AccMiniModal'
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux'
import { getOneUser } from '../../../redux/reducers/User/UserActions'

const AuthNavbar = () => {
  let [accModal, setAccModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { oneUser } = useAppSelector(state => state.userReducer)

  useEffect(() => {
    const uidString = localStorage.getItem('uid');
    const uid = uidString ? JSON.parse(uidString) : null;
    if(uid) {
      dispatch(getOneUser({ uid }))
    }
  }, [])
  return (
    <>
      <nav className={style.nav}>
        <div className={style.nav__wrapper}>
          <div className={style.nav__logo}>
            <div className={style.logo__wrapper}>
              <img src={logo} alt="" />
            </div>
            <div className={style.button__wrapper}>
              <button onClick={() => navigate('/')}>Главная</button>
              <button onClick={() => navigate('/create')} className={style.active}>Создать</button>
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
              {oneUser ? (
                <div className={style.item__wrapper} onClick={() => navigate(`/user/${oneUser.username}`)}>
                  <div className={style.item__avatar}>
                    <img src={(oneUser as any).profilePicURL} alt="" />
                  </div>
                </div>
              ) : (
                <div className={style.item__wrapper}>
                  <div className={style.item__avatar}></div>
                </div>
              )}
            <div className={style.item__wrapper} onClick={() => setAccModal(true)}>
            <svg className="gUZ ztu U9O kVc" height="12" width="12" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0"></path></svg>
            </div>
          </div>

        </div>
      </nav>
      <AccMiniModal oneUser={oneUser} active={accModal} setActive={setAccModal} />
    </>
  )
}

export default AuthNavbar
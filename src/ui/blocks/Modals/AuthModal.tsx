import React, { FC, useState } from 'react'
import google from '../../../assets/Icons/Google.svg'
import facebook from '../../../assets/Icons/Facebook.svg'
import closeIcon from '../../../assets/Icons/Close.svg'
import logo from '../../../assets/Icons/Logo.svg'
import { ModalProps, authEnum } from '../../../types/modalTypes'
import { IUser } from '../../../types/types'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux'
import { loginUser, loginWithFacebook, loginWithGoogle, registerUser } from '../../../redux/reducers/User/UserActions'
import { useSignInWithGoogle, useSignInWithFacebook } from "react-firebase-hooks/auth";
import { auth } from '../../../firebase'

const AuthModal: FC<ModalProps> = ({ active, setActive, authName }) => {
  const [userObj, setUserObj] = useState<IUser>({
    email: '',
    password: '',
    password_confirm: '',
    username: '',
  })
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);

  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch()
  const { modalOpen, oneUser, loading } = useAppSelector(state => state.userReducer)

  const handleRegister = () => {
    dispatch(registerUser({ userObj, navigate }));
    setActive(modalOpen)
  }
  const handleLogin = () => {
    dispatch(loginUser({ userObj, navigate }));
    setActive(modalOpen)
  }


  const handleClose = () => {
    setActive(false);
    //dispatch(openModal());
  }
  const handleGoogle = () => {
    dispatch(loginWithGoogle({ navigate, signInWithGoogle }))
  }
  const handleFacebook = () => {
    //dispatch(loginWithFacebook({ navigate, signInWithFacebook }))
  }
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="close__icon" onClick={handleClose} >
          <img src={closeIcon} alt="" />
        </div>
        <div className='modal__block'>
          <div className='modal__text'>
            <img src={logo} alt="" /> 
            <h2>Добро пожаловать в Pinterest</h2>
            <p>Находите новые идеи для вдохновения</p>
          </div>

          <div className='modal__inputs'>
            <div className='input__item'>
                <p>Адрес электронной почты</p>
                <input onChange={(e) => setUserObj({...userObj, email: e.target.value})} placeholder='Введите адрес эл. почты' type="text" />
              </div>
              <div className='input__item'>
                <p>Пароль</p>
                <input onChange={(e) => setUserObj({...userObj, password: e.target.value})} placeholder='Введите пароль' type="password" />
              </div>
            </div>

            <div className='modal__btns'>
              <button onClick={authName === authEnum.register ? handleRegister : handleLogin} className='continue__btn'>Продолжить</button>
              <p>ИЛИ</p>
              <button className='google__btn' onClick={handleGoogle}><img src={google} alt="" />Google</button>
              <button className='facebook__btn' onClick={handleFacebook}><img src={facebook} alt="" /> Facebook</button>
              {authName === authEnum.register ? (
                <><p>Уже зарегистрировались? <a href="">Войти</a></p></>
                ) : (
                <><p>Нету аккаунта? <a href="">Зарегистрируйтесь</a></p></>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
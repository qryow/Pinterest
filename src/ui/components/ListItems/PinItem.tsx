import React from 'react'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom'
import style from '../../../styles/ui/pins.module.scss'
import { IPin } from '../../../types/types';
import { useAppSelector } from '../../../helpers/hooks/redux';

const PinItem = ({ pin, name}: {pin: IPin, name?: string}) => {
  console.log(pin)
  const navigate: NavigateFunction = useNavigate();
  const { oneUser } = useAppSelector(state => state.userReducer);
  const location = useLocation();
  console.log(location)

  return (
    <div onClick={() => navigate(`/pin/${pin.id}`)} className={style.pin__item}>
          <div className={style.section__item}>
            <img src={pin.img} alt="" />
          </div>
          {name === 'own' ? null : (
            <div className={style.text__wrapper}>
              <h4>{pin.name}</h4>
              <div className={style.pin__logo}>
                <img src={oneUser?.profilePicURL} alt="" />
                <p>{oneUser?.username}</p>
              </div>
            </div>
          )}
        </div>
  )
}

export default PinItem
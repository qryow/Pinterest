import React, { FC, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { isUserLogin } from '../helpers/functions';
import { useAppDispatch, useAppSelector } from '../helpers/hooks/redux';
import { getOneUser } from '../redux/reducers/User/UserActions';
import style from '../styles/ui/pins.module.scss'
import List from '../ui/blocks/List';
import { getRandomedPins } from '../redux/reducers/Pins/PinsAction';
import { tailspin } from 'ldrs';
import { OneUser, IPin } from '../types/types';
import PinItem from '../ui/components/ListItems/PinItem';

const HomePage: FC = () => {
  const isLogin = isUserLogin(); 
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  //! надо использовать selector в отдельном модуле
  const { pins, loading} = useAppSelector(state => state.pinReducer);
  console.log(pins)
  
  useEffect(() => {
    if(!isLogin) {
      navigate('/')
    }
    dispatch(getRandomedPins())
  }, [])
  
  tailspin.register();
  return (
    <>
      {loading ? (
        <div className={style.load__wrapper}>
          <l-tailspin 
            size="40"
            stroke="5"
            speed="0.9" 
            color="black" 
          ></l-tailspin>
        </div>
      ) : (
        <div className={style.pins__wrapper}>
          <List items={pins} renderItem={(pin: IPin) => <PinItem pin={pin} key={pin.id} />} />
        </div>
      )}
    </>
  )
}

export default HomePage
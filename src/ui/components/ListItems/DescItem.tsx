import React from 'react'
import { IDesc } from '../../../types/types'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../helpers/hooks/redux';
import style from '../../../styles/ui/profile.module.scss'
import { getWordForm } from '../../../helpers/functions';

const DescItem = ({ desc }: {desc: IDesc }) => {
  const navigate: NavigateFunction = useNavigate();
  const { oneUser } = useAppSelector(state => state.userReducer)
  return ( 
    <div onClick={() => navigate(`/user/${oneUser?.username}/${desc.id}`)} className={style.desc__item__wrapper}>
      <div className={style.desc__item}>
        <div className={style.first__block}>
          {desc.pins[0] ? (
            <img src={desc.pins[0].img} alt="" />
          ) : null}
        </div>
        <div className={style.second__block}>
          {desc.pins[1] ? (
            <>
              <img className={style.img_1} src={desc.pins[1].img} alt="" />
            </>
          ) : null}
          {desc.pins[2] ? (
            <>
              <img className={style.img_2} src={desc.pins[2].img} alt="" />
            </>
          ) : null}
          
        </div>
      </div>
      <h5>{desc.name}</h5>
      <span>{desc.pins.length} {getWordForm(desc.pins.length, 'пин', 'пина', 'пинов')}</span>
    </div>
  )
}

export default DescItem
import React, { FC, useEffect, useState } from 'react'
import style from '../styles/ui/desc.module.scss'
import style2 from '../styles/ui/pins.module.scss'
import { useAppDispatch, useAppSelector } from '../helpers/hooks/redux';
import { getWordForm } from '../helpers/functions';
import { useParams } from 'react-router-dom';
import { getOneDesc } from '../redux/reducers/Descs/DescsActions';
import List from '../ui/blocks/List';
import { IPin } from '../types/types';
import PinItem from '../ui/components/ListItems/PinItem';

const OneDescPage: FC = () => {
  //! надо использовать selector в отдельном модуле
  const { oneDesc } = useAppSelector(state => state.descReducer);
  console.log(oneDesc)
  const dispatch = useAppDispatch()
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOneDesc({ id }))
  }, [])

  return (
    <>
    {oneDesc && (
      <>
        <div className={style.desc__wrapper}>
          <div className={style.desc__name}>
            <h4>{oneDesc.name}</h4>
            <div className={style.desc__settings}>
              <svg className="Uvi gUZ U9O kVc" height="16" width="16" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img">
                <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M3 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6m18 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6"></path></svg>
              </div>
            </div>

            <p className={style.pin__count}>{oneDesc.pins.length} {getWordForm(oneDesc.pins.length, 'пин', 'пина', 'пинов')}</p>

            <div className={style2.pins__wrapper}>
              <List items={oneDesc.pins} renderItem={(pin: IPin) => <PinItem pin={pin} key={pin.id} />} />
            </div>
          </div>
          {/*<div className={addModal ? `${style.add__section} ${style.add__active}` : `${style.add__section}`} onClick={() => setAddModal(true)}>
            <svg className="Uvi gUZ U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img">
              <path {...(addModal ? { fill: "white" } : {})} d="M22 10h-8V2a2 2 0 0 0-4 0v8H2a2 2 0 0 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4"></path></svg>
            </div>*/}
      </>
    )}
    </>
  )
}

export default OneDescPage
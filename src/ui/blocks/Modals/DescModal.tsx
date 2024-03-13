import React, { FC, useState } from 'react'
import { ModalProps } from '../../../types/modalTypes'
import closeIcon from '../../../assets/Icons/Close.svg'
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { openModal } from '../../../redux/reducers/Descs/DescsSlice';
import { createDesc } from '../../../redux/reducers/Descs/DescsActions';

const DescModal: FC<ModalProps> = ({ active, setActive }) => {
  const [descObj, setDescObj] = useState({
    descName: '',
  });

  const dispatch = useAppDispatch();
  const { oneUser, modalOpen } = useAppSelector(state => state.userReducer)
  const handleClose = () => {
    setActive(false);
    dispatch(openModal());
  }
  const handleAdd = () => {
    if(oneUser) {
      dispatch(createDesc({ descObj, uid: oneUser?.uid }))
      setDescObj({
        descName: ''
      })
      setActive(modalOpen);
    }
  }
  return (
    <div className={`modal ${active ? 'active' : ''}`} onClick={handleClose}>
      <div className="desc__content" onClick={e => e.stopPropagation()}>
        <div className="close__icon" onClick={handleClose} >
          <img src={closeIcon} alt="" />
        </div>
        <div className="close__icon" onClick={handleClose} >
          <img src={closeIcon} alt="" />
        </div>

        <h4 className="desc__title">Создание доски</h4>

        <div className="desc__input">
          <p>Название</p>
          <input value={descObj.descName} onChange={(e) => setDescObj({ ...descObj, descName: e.target.value })} type="text" placeholder='Например, «Куда пойти?» или «Рецепты»' />
        </div>

        <div className="desc__checkbox_block">
          <div className="desc__checkbox">
            <input type="checkbox" />
          </div>
          <div className="desc__checkbox_text">
            <h6>Оставить доску секретной</h6>
            <p>Видеть можете только вы и соавторы. Подробнее</p>
          </div>
        </div>

        <div className="desc__btn">
          <button onClick={handleAdd} className={descObj.descName !== '' ? 'edit__save' : 'edit__reset'}>Создать</button>
        </div>
      </div>
    </div>

  )
}

export default DescModal
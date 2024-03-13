import React, { FC, useRef, useState } from 'react'
import style from '../../../styles/ui/modal.module.scss'
import { ModalProps } from '../../../types/modalTypes';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../../helpers/hooks/useClickOutside';

const AddMiniModal: FC<ModalProps> = ({ active, setActive, setDescModal }) => {
  const [isPinActive, setPinActive] = useState(true);
  const navigate = useNavigate()
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    setActive(false);
  })

  const handleDesc = () => {
    setActive(false)
    if (setDescModal) {
      setDescModal(true);
    }
  }

  return (
    <div className={active ? `${style.modal} ${style.isActive}` : `${style.modal}`} ref={menuRef}>
      <p className={style.modal__subtitle}>Создать:</p>

      <div
        className={`${style.modal__item} ${isPinActive ? style.modal__item_active : ''}`}
        onMouseEnter={() => setPinActive(true)}
        onMouseLeave={() => setPinActive(false)}
        onClick={() => navigate('/create')}
      >
        <p>Пин</p>
      </div>

      <p className={style.modal__subtitle_2}>Добавить:</p>

      <div
        className={`${style.modal__item} ${!isPinActive ? style.modal__item_active : ''}`}
        onMouseEnter={() => setPinActive(false)}
        onMouseLeave={() => setPinActive(true)}
        onClick={handleDesc}
      >
      <p>Доску</p>
      </div>
    </div>
  )
}

export default AddMiniModal
import React, { FC, useEffect, useRef } from 'react'
import { ModalProps } from '../../../types/modalTypes'
import style from '../../../styles/ui/modal.module.scss'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useClickOutside } from '../../../helpers/hooks/useClickOutside';
import { useAppDispatch } from '../../../helpers/hooks/redux';
import { signOut } from '../../../redux/reducers/User/UserActions';

const AccMiniModal: FC<ModalProps> = ({ oneUser, active, setActive }) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setActive(false);
  })

  const handleLogout = () => {
    dispatch(signOut({ navigate }));
    setActive(false)
  }

  useEffect(() => {
    
  }, [])
  return (
    <div className={active ? `${style.navModal} ${style.isActive}` : `${style.navModal}`} ref={menuRef}>
      <p className={style.modal__subtitle}>Сейчас:</p>
        {oneUser && (
          <>
            {oneUser ? (
              <>
                <div className={style.modal__account} onClick={() => navigate(`/user/${oneUser.username}`)}>
                  <div className={style.acc__avatar}>
                    {!(oneUser as any).profilePicURL ? (
                      <>
                      
                      </>
                    ) : (
                      <>
                        <img src={(oneUser as any).profilePicURL} alt="" />
                      </>
                    )}
                  </div>
                  <div className={style.acc__info}>
                    <h3>{(oneUser as any).fullName}</h3>
                    <h5>Личный</h5>
                    <h6>{(oneUser as any).email}</h6>
                  </div>
                </div>
              </>
            ) : (
              <>

              </>
            )}
          </>
        )}
      
      <p className={style.modal__subtitle}>Ваши аккаунты</p>

      <p className={style.modal__subtitle}>Дополнительно</p>
      <div className={style.modal__item} onClick={handleLogout}>
        <p>Выход</p>
      </div>
    </div>
  )
}

export default AccMiniModal
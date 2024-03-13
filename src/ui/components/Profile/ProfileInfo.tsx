import React, { useEffect, useRef, useState } from 'react'
import style from '../../../styles/ui/profile.module.scss'
import pinStyle from '../../../styles/ui/pins.module.scss'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '../../blocks/Modals/Modal';
import EditModal from '../../blocks/Modals/EditModal';
import AddMiniModal from '../../blocks/Modals/AddMiniModal';
import DescModal from '../../blocks/Modals/DescModal';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { getOneUser } from '../../../redux/reducers/User/UserActions';
import { getOwnPins } from '../../../redux/reducers/Pins/PinsAction';
import List from '../../blocks/List';
import PinItem from '../ListItems/PinItem';
import { IDesc, IPin } from '../../../types/types';
import { getOwnDescs } from '../../../redux/reducers/Descs/DescsActions';
import DescItem from '../ListItems/DescItem';
import { getWordForm } from '../../../helpers/functions';
import { Id } from '@reduxjs/toolkit/dist/tsHelpers';

const ProfileInfo = () => {
  const [editModal, setEditModal] = useState(false);
  const [descModal, setDescModal] = useState(false);
  const [addMiniModal, setAddMiniModal] = useState(false);
  
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch()
  const { oneUser } = useAppSelector(state => state.userReducer)
  const { pins } = useAppSelector(state => state.pinReducer);
  const { descs } = useAppSelector(state => state.descReducer);
  const location = useLocation();
  const menuRef = useRef<any>()

  useEffect(() => {
    const uidString = localStorage.getItem('uid');
    const uid = uidString ? JSON.parse(uidString) : null;
    if(uid) {
      dispatch(getOneUser({ uid }))
      dispatch(getOwnPins(uid))
      dispatch(getOwnDescs(uid))
    }
  }, [])
  
  const isOwnProfile = '' !== oneUser?.email;
  const isAnotherProfile = '' === oneUser?.email;
  return (
    <>
      {oneUser && (
        <>
          <div className={style.profile__wrapper}>
            <div className={style.profile__avatar}>
              <img src={oneUser.profilePicURL} alt="" />
            </div>

            <div>
              <h3 className={style.profile__fullname}>{oneUser.fullName}</h3>
              <div className={style.profile__username}>
                <svg className={style.svg} height="16" width="16" viewBox="0 0 24 24" aria-label="pinterest" role="img"><path d="M0 12a12 12 0 0 0 7.73 11.22 12 12 0 0 1 .03-3.57l1.4-5.94S8.8 13 8.8 11.94c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.65 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86a5.17 5.17 0 0 0-5.39 5.18c0 1.03.4 2.13.9 2.73q.12.17.08.34l-.34 1.36q-.06.31-.4.16c-1.49-.7-2.42-2.88-2.42-4.63 0-3.77 2.74-7.23 7.9-7.23 4.14 0 7.36 2.95 7.36 6.9 0 4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.37l-.74 2.84a14 14 0 0 1-1.55 3.23A12 12 0 1 0 0 12"></path></svg>
                <p>{oneUser.username}</p>
              </div>
              <p className={style.bio}>{oneUser?.bio}</p>
              <p className={style.following}>{oneUser.following.length === 0 ? "" : oneUser.following.length === 1 ?  `${oneUser.following.length} подписка` : `${oneUser.following.length} подписки`}</p>
              {isOwnProfile && (
                <div className={style.btns__wrapper}>
                  <button onClick={() => setEditModal(true)} className={style.btn__item}>Изменить профиль</button>
                </div>
              )}
              {isAnotherProfile && (
                <div className={style.btns__wrapper}>
                  <button className={style.follow__btn}>Подписаться</button>
                </div>
              )}
            </div>

            <div className={style.navigate}>
              <div onClick={() => navigate(`/user/${oneUser.username}/created`)} className={`${style.nav__item} ${location.pathname === `/user/${oneUser.username}/created` ? '' : style.active}`}>
                <p>Созданные</p>
                {location.pathname === `/user/${oneUser.username}/created` && <div className={style.line__wrapper}><div className={style.line}></div></div>}
              </div>
              <div onClick={() => navigate(`/user/${oneUser.username}/saved`)} className={`${style.nav__item} ${location.pathname === `/user/${oneUser.username}/saved` || location.pathname === `/user/${oneUser.username}` ? '' : style.active}`}>
                <p>Сохраненные</p>
                {(location.pathname === `/user/${oneUser.username}/saved` || location.pathname === `/user/${oneUser.username}`) && (
                  <div className={style.line__wrapper}>
                    <div className={style.line}></div>
                  </div>
                )}
              </div>
            </div>

            <div className={style.add_filter__block} ref={menuRef}>
              <div className={addMiniModal ? `${style.block__item} ${style.block__item_active}` : `${style.block__item}`}>
                <svg className="Uvi gUZ U9O kVc" height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img">
                  <path {...(addMiniModal ? { fill: "white" } : {})} d="M9 19.5A1.75 1.75 0 1 1 9 16a1.75 1.75 0 0 1 0 3.5M22.25 16h-8.32a5.24 5.24 0 0 0-9.86 0H1.75a1.75 1.75 0 0 0 0 3.5h2.32a5.24 5.24 0 0 0 9.86 0h8.32a1.75 1.75 0 0 0 0-3.5M15 4.5A1.75 1.75 0 1 1 15 8a1.75 1.75 0 0 1 0-3.5M1.75 8h8.32a5.24 5.24 0 0 0 9.86 0h2.32a1.75 1.75 0 0 0 0-3.5h-2.32a5.24 5.24 0 0 0-9.86 0H1.75a1.75 1.75 0 0 0 0 3.5"></path>
                </svg>
              </div>
              <div onClick={() => setAddMiniModal(true)} className={addMiniModal ? `${style.block__item} ${style.block__item_active}` : `${style.block__item}`}>
                <svg className="Uvi gUZ U9O kVc" height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img">
                  <path {...(addMiniModal ? { fill: "white" } : {})} d="M22 10h-8V2a2 2 0 0 0-4 0v8H2a2 2 0 0 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4"></path>
                </svg>
                <AddMiniModal active={addMiniModal} setActive={setAddMiniModal} setDescModal={setDescModal} />
              </div>
            </div>

            {(location.pathname === `/user/${oneUser.username}/saved` || location.pathname === `/user/${oneUser.username}`) && (
              <div className={style.descs__wrapper}>
                <div onClick={() => navigate(`/${oneUser?.username}/all`)} className={style.desc__item__wrapper}>
                  <div className={style.desc__item}>
                    <div className={style.first__block}>
                      {pins[0] ? (
                      <img src={pins[0].img} alt="" />
                      ) : null}
                    </div>
                    <div className={style.second__block}>
                      {pins[1] ? (
                        <>
                          <img className={style.img_1} src={pins[1].img} alt="" />
                        </>
                      ) : null}
                      {pins[2] ? (
                        <>
                          <img className={style.img_2} src={pins[2].img} alt="" />
                        </>
                      ) : null}

                    </div>
                  </div>
                  <h5>Все пины</h5>
                  <span>{pins.length} {getWordForm(oneUser.pins.length, 'пин', 'пина', 'пинов')}</span>
                </div>
                {descs.map((desc: IDesc) => (
                  <DescItem desc={desc} key={desc.id}  />
                ))}
              </div>
            )}


            {(location.pathname === `/user/${oneUser.username}/created`) && (
              <div className={pinStyle.pins__wrapper}>
                <List items={pins} renderItem={(pin: IPin) => <PinItem pin={pin} key={pin.id} name='own' />} />
              </div>
            )}

          </div>
          <Modal>
            {editModal ? (
              <EditModal active={editModal} setActive={setEditModal} />
            ) : (
              <DescModal active={descModal} setActive={setDescModal} />
            )}
          </Modal>
        </>
      )}
    </>
  )
}

export default ProfileInfo
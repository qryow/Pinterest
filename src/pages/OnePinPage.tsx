import React, { FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../helpers/hooks/redux'
import { useClickOutside } from '../helpers/hooks/useClickOutside'
import style from '../styles/ui/pins.module.scss';
import { addComent, addToDesc, getPinById } from '../redux/reducers/Pins/PinsAction';
import { getOwnDescs } from '../redux/reducers/Descs/DescsActions';
import { IDesc } from '../types/types';

const OnePinPage: FC = () => {
  const [selectedDesc, setSelectedDesc] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [descModal, setDescModal] = useState(false)
  const [commentInput, setCommentInput] = useState('')

  const { id } = useParams();
  console.log(id)
  const dispatch = useAppDispatch();

  //! надо использовать selector в отдельном модуле
  const { onePin } = useAppSelector(state => state.pinReducer)
  const { oneUser } = useAppSelector(state => state.userReducer)
  const { descs } = useAppSelector(state => state.descReducer)
  console.log(descs)

  const handleClick = (name: string, id: string) => {
    setSelectedDesc(name)
    setSelectedId(id)
    setDescModal(false)
  }

  const handleAddToDesk = () => {
    dispatch(addToDesc({ pinId: id, descId: selectedId, userId: onePin?.author }))
  }

  const handleAddComment = () => {
    if(onePin && id) {
      dispatch(addComent({ pinId: id, userId: onePin.author, input: commentInput }))
      setCommentInput('')
    }
  }

  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setDescModal(false);
  })


  //! надо useEffect вызывыать в самом конце до return
  useEffect(() => {
    if (id) {
      dispatch(getPinById(id))
    }
  }, [id])

  useEffect(() => {
    //dispatch(getUserDescs({ uid: oneUser?.uid }))
    if(oneUser) {
      dispatch(getOwnDescs(oneUser?.uid))
    }
  }, [oneUser])

  const [imageHeight, setImageHeight] = useState<number | null>(null);
  //! надо state типизировать либо везде, либо ввобше не типизировать
  const imgRef = useRef<HTMLImageElement | null>(null);

  const changeImg = () => {
    if (onePin?.img && imgRef.current) {
      const img = new Image();
      img.onload = () => {
        if (imgRef.current) {
          const height = imgRef.current.getBoundingClientRect().height;
          setImageHeight(height);
        }
      };
      img.src = onePin.img;
    }
  }
  
  useEffect(() => {
    changeImg()
  }, [onePin]);

  return (
    <>
      {onePin && (
        <>
          <div className={style.detail__wrapper} style={{ height: `${imageHeight}px` }}>
            <div className={style.detail__block1}>
              <img ref={imgRef} src={onePin?.img} className={style.block__img} alt="" />
            </div>
      
            <div className={style.detail__block2}>
              <div className={style.block2__top}>
                <div className={style.choose__item}>
                  {descs[0] && (
                    <button onClick={() => setDescModal(true)} className={style.chooice__btn}>{selectedDesc !== '' ? selectedDesc : descs[0].name}<svg className="Uvi gUZ U9O kVc" height="12" width="12" viewBox="0 0 24 24" aria-label="Выберите доску для сохранения" role="img"><path d="M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0"></path></svg></button>
                  )}
                  <button onClick={handleAddToDesk} className={style.save__btn}>Сохранить</button>
                </div>

                <h4 className={style.detail__title}>{onePin.name}</h4>
                <p className={style.detail__bio}>{onePin.bio}</p>

                <div className={style.detail__acc}>
                  <img src={oneUser?.profilePicURL} alt="" />

                  <div className={style.acc__text}>
                    <p className={style.acc__name}>{oneUser?.username}</p>
                    <p className={style.acc__followers}>количество подписчиков</p>
                  </div>

                  <button className={style.acc__btn}>Подписаться</button>
                </div>

                <p className={style.comments__title}>Коментарии</p>
                <p className={style.comments__text}>{onePin.comments.length <= 0 ? (
                  'У вас еще нет комментариев. Добавьте комментарий, чтобы начать обсуждение.'
                ) : null}</p>
                <div className={style.comments__wrapper}>
                  {onePin?.comments.map((item: any, index: any) => (
                    <div key={index} className={style.one__block}>
                      <img className={style.comment__img} src={oneUser?.profilePicURL} alt="" />
                      <p className={style.comment__acc}>{oneUser?.username} <span>{item.name}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={style.comment__wrapper}>
              <div className={style.comment__acc}>
                <img src={oneUser?.profilePicURL} alt="" />
              </div>
              <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder='Добавить коментарий' type="text" />
              {commentInput !== '' ? (
                <button onClick={handleAddComment} className={style.send__btn}>
                  <svg className="Hn_ AR6 gUZ U9O kVc" height="18" width="18" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path fill='white' d="m.46 2.43-.03.03c-.4.42-.58 1.06-.28 1.68L3 10.5 16 12 3 13.5.15 19.86c-.3.62-.13 1.26.27 1.67l.05.05c.4.38 1 .56 1.62.3l20.99-8.5q.28-.12.47-.3l.04-.04c.68-.71.51-2-.51-2.42L2.09 2.12Q1.79 2 1.49 2q-.61.01-1.03.43"></path></svg>
                </button>
              ) : null}
            </div>

            <div className={descModal ? `${style.desc__modal} ${style.isActive}` : `${style.desc__modal}`} ref={menuRef}>
              <input type='text' placeholder='Поиск'/>

              <p className={style.desc__name}>Все доски</p>

              <div className={style.descs__list}>
                {descs && (
                  <>
                    {descs.map((item: IDesc) => (
                      <div key={item.id} onClick={() => handleClick(item.name, item.id)} className={style.desc__item}>
                        <div className={style.item__img}>
                          {item.pins[0] ? (
                            <img src={item.pins[0].img} alt="" />
                          ) : null}
                          <div className={style.item__text}>{item.name}</div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default OnePinPage
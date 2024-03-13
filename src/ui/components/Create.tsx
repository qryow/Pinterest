import React, { useEffect, useRef, useState } from 'react'
import style from '../../styles/ui/pins.module.scss'
import { useClickOutside } from '../../helpers/hooks/useClickOutside';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from '../../firebase';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { createPin } from '../../redux/reducers/Pins/PinsAction';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { tailspin } from 'ldrs';

const Create = () => {
  const [selectedDesc, setSelectedDesc] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [descModal, setDescModal] = useState(false)
  const [tagInput, setTagInput] = useState('');
  const [inputs, setInputs] = useState({
    name: '',
    bio: '',
    tags: [],
  });

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { oneUser } = useAppSelector(state => state.userReducer)
  const { loading } = useAppSelector(state => state.pinReducer)

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: any) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			if (file.size > maxFileSizeInBytes) {
				console.log("Error", "File size must be less than 2MB", "error");
				setSelectedFile(null);
				return;
			}
			const reader = new FileReader();

			reader.onloadend = async () => {
        const base64data = reader.result as string;
        setSelectedFile(base64data);
        try {
          const storageRef = ref(storage, `profilePics/${oneUser?.uid}`);
          await uploadString(storageRef, base64data, "data_url");
          const URL = await getDownloadURL(storageRef);
          console.log("Image uploaded. URL:", URL);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };

			reader.readAsDataURL(file);
		} else {
			console.log("Error", "Please select an image file", "error");
			setSelectedFile(null);
		}
	};

  const handleTagInputChange = (e: any) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag !== '') {
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        tags: [...prevInputs.tags, `#${trimmedTag}`], // Добавляем символ "#" перед значением тега
      }));
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      tags: prevInputs.tags.filter(tag => tag !== tagToDelete),
    }));
  };

  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setDescModal(false);
  })

  const handleClick = (name: string, id: string) => {
    setSelectedDesc(name)
    setSelectedId(id)
    setDescModal(false)
  }

  const handleAddPin = () => {
    if(oneUser && selectedFile) {
      dispatch(createPin({ inputs, selectedFile, descId: selectedId, userId: oneUser?.uid, navigate }))
    }
  }

  //useEffect(() => {
  //  dispatch(getUserDescs({ uid: oneUser?.uid }) as any)
  //}, [oneUser])

  tailspin.register();
  return (
    <>
      {loading ? (
        <>
          <div className={style.add__wrapper}>
            <div className={style.loading__wrapper}>
              <l-tailspin 
                size="40"
                stroke="5"
                speed="0.9" 
                color="black" 
              ></l-tailspin>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={style.add__wrapper}>
            <div className={style.add__header}>
              <h4>Создание пина</h4>
              {selectedFile ? (
                <button onClick={handleAddPin}>Опубликовать</button>
              ): null}
            </div>

            <div className={style.add__block}>
              <div className={style.add__left}>
                {selectedFile !== null || '' ? (
                  <>
                    {selectedFile && (
                      <>
                        <div className={style.selected__block}>
                          <img src={selectedFile} alt="" />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div onClick={() => fileRef.current && fileRef.current.click()} className={style.select__block}>
                      <p>Выберите файл</p>
                    </div>
                    <input type='file' hidden ref={fileRef} onChange={handleImageChange} />
                  </>
                )}
              </div>
              <div className={style.add__right}>
                <div className={style.edit__input}>
                  <p>Название</p>
                  <input value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} className={style.input__item} placeholder='Добавьте название' type="text" />
                </div>
                <div className={style.edit__input}>
                  <p>Описание</p>
                  <textarea value={inputs.bio} onChange={(e) => setInputs({ ...inputs, bio: e.target.value })} placeholder='Добавьте подробне описание' ></textarea>
                </div>
                <div className={style.edit__input}>
                  <p>Доска</p>
                  <div onClick={() => setDescModal(true)} className={style.input__wrapper}>
                    <div className={style.input__item}><p>{selectedDesc !== '' ? selectedDesc : 'Выберите доску'}</p></div>
                    <div className={style.desc__img}>
                      <img src="" alt="" />
                    </div>
                    {/*<p className={style.desc__placeholder}>{selectedDesc != '' ? </p> */}
                    <svg className={style.arrow__down} height="12" width="12" viewBox="0 0 24 24" aria-label="Выберите доску" role="img"><path d="M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0"></path></svg>
                  </div>

                  <div className={style.edit__input}>
                    <p>Теги</p>
                    <input value={tagInput} onChange={handleTagInputChange} className={style.input__item} placeholder='Добавьте тег' type="text" />
                    <div className={style.tags__list}>
                      {inputs.tags && inputs.tags.map((item, index) => (
                        <div key={index} className={style.tag__item}>
                          <p>{item}</p>
                          <svg
                            className="AR6 gUZ U9O kVc"
                            height="12"
                            width="12"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            aria-label=""
                            role="img"
                            onClick={() => handleDeleteTag(item)}
                          >
                            <path
                              fill='white'
                              d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"
                            ></path>
                          </svg>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleAddTag} className={style.btn__item}>Добавить тег</button>
                  </div>

                  <div className={descModal ? `${style.desc__modal} ${style.isActive}` : `${style.desc__modal}`} ref={menuRef}>
                    <input type='text' placeholder='Поиск'/>

                    <p className={style.desc__name}>Все доски</p>

                    <div className={style.descs__list}>
                      {/*{descs.descs && (
                        <>
                          {descs.descs.map((item: any) => (
                              <div key={item.id} onClick={() => handleClick(item.descName, item.id) as any} className={style.desc__item}>
                                <div className={style.item__img}>
                                  <img src="" alt="" />
                                  <div className={style.item__text}>{item.descName}</div>
                                </div>
                                {item.sections && (
                                  <>
                                    {item.sections.length > 0 ? (
                                      <div className={style.arrow__left} key={item.id}>
                                        <svg className="Hn_ Uvi gUZ U9O kVc" height="12" width="12" viewBox="0 0 24 24" aria-label="доска с разделами" role="img"><path d="M6.65.66c-.87.88-.87 2.3 0 3.18L14.71 12l-8.06 8.16c-.87.88-.87 2.3 0 3.18a2.2 2.2 0 0 0 3.14 0L21 12 9.8.66a2.2 2.2 0 0 0-3.15 0"></path></svg>
                                      </div>
                                    ): null}
                                  </>
                                )}
                              </div>
                          ))}
                        </>
                      )}*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Create
import React, { FC, useEffect, useRef, useState } from 'react'
import { ModalProps } from '../../../types/modalTypes';
import closeIcon from '../../../assets/Icons/Close.svg'
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { storage } from '../../../firebase';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { editProfile } from '../../../redux/reducers/User/UserActions';
import { openModal } from '../../../redux/reducers/User/UserSlice';
import { tailspin } from 'ldrs';

const EditModal: FC<ModalProps> = ({ active, setActive }) => {
  const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		bio: "",
	});

  const { oneUser, modalOpen } = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate()

  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
	const maxFileSizeInBytes = 20 * 1024 * 1024; // 20MB

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(files && files.length > 0) {
      const file = files[0];
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
    }
  }

  const handleEditProfile = () => {
    if(oneUser) {
      dispatch(editProfile({ inputs, selectedFile, oneUser, navigate }));
      setActive(modalOpen)
    }
  }

  const handleClose = () => {
    setActive(false)
    dispatch(openModal());
  }

  const handleReset = () => {
    if (oneUser) {
      setInputs({
        fullName: oneUser.fullName || "",
        username: oneUser.username || "",
        bio: oneUser.bio || "",
      });
      setSelectedFile(oneUser.profilePicURL)
    }
  }

  useEffect(() => {
    if (oneUser) {
      setInputs({
        fullName: oneUser.fullName || "",
        username: oneUser.username || "",
        bio: oneUser.bio || "",
      });
      setSelectedFile(oneUser.profilePicURL)
    }
  }, []);

  tailspin.register()
  return (
    <div className={active ? "modal active" : "modal"} onClick={handleClose}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        <div className="close__icon" onClick={handleClose} >
          <img src={closeIcon} alt="" />
        </div>
        <h2 className="edit__title">Изменение профиля</h2>
        <p className="edit__text">Позаботьтесь о конфиденциальности личных данных. Добавляемая вами информация видна всем, кто может просматривать ваш профиль.</p>

        <div className="edit__avatar__wrapper">
          <p>Фотография</p>
          <div className="edit__avatar__block">
            <div className="edit__avatar">
              {selectedFile && <img src={selectedFile} alt="" />}
            </div>

            <button onClick={() => fileRef.current && fileRef.current.click()}>Изменить</button>
            <input type='file' hidden ref={fileRef} onChange={handleImageChange} />
          </div>

          <div className="edit__input">
            <p>Полное имя</p>
            <input value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} placeholder='Введите ваше полное имя' type="text" />
          </div>

          <div className="edit__bio">
            <p>Описание</p>
            <textarea value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })} placeholder='Раскажите свою историю' name="" id="" cols={30} rows={10}></textarea>
          </div>

          <div className="edit__input">
            <p>Имя пользователя</p>
            <input value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })} placeholder='Выбирайте мудро, чтобы другие могли найти вас' type="text" />
          </div>
          <p className="url">{`www.pinterest.com/${inputs.username}`}</p>

          <div className="edit__btns">
            <button onClick={handleReset} className="edit__reset">Сбросить</button>
            <button onClick={handleEditProfile} className="edit__save">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditModal
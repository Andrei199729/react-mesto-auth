import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='edit'
            isOpen={props.isOpen}
            onClose={props.onClose}
            btnText='Сохранить'
            onSubmitForm={handleSubmit}
        >
            <div className="form__column">
                <input
                    className="form__input form__input_type_name"
                    id="name"
                    type="text"
                    name="nametype"
                    placeholder="Введите ваше имя"
                    minLength="2"
                    maxLength="40"
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <span className="error" id="name-error"></span>
                <input
                    className="form__input form__input_type_job"
                    type="text"
                    id="job"
                    name="job"
                    placeholder="Введите вашу профессию"
                    minLength="2"
                    maxLength="200"
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <span className="error error_below" id="job-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
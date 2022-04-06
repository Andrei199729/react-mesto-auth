import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState('Введите своё имя');
    const [jobError, setJobError] = useState('Введите свою проффессию');
    const [nameDirty, setNameDirty] = useState(false);
    const [jobDirty, setJobDirty] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        if (props.isOpen) {
            setFormValid(true);
        }
    }, [currentUser, props.isOpen]);

    useEffect(() => {
        if (nameError || jobError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, jobError])

    function handleChangeName(e) {
        setName(e.target.value);
        if (!e.target.validity.valid && e.target.value.length < 2 || e.target.value.length > 30) {
            setNameError('Введите имя профиля. Имя должно быть длинее 2 и меньше 30');
            if (!e.target.value) {
                setNameError('Имя профиля не должно быть пустым');
            }
        } else {
            setNameError('');
        }
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
        if (!e.target.validity.valid && e.target.value.length < 2 || e.target.value.length > 30) {
            setJobError('Введите профессию профиля. Название профессии должно быть длинее 2 и меньше 30');
            if (!e.target.value) {
                setJobError('Название профессии не должно быть пустым');
            }
        } else {
            setJobError('');
        }
    }

    function blurHandler(e) {
        switch (e.target.name) {
            case 'nametype':
                setNameDirty(true);
                break;
            case 'job':
                setJobDirty(true);
                break;
        }
    }

    function handleSubmit() {
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
        props.onClose();
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='edit'
            isOpen={props.isOpen}
            onClose={props.onClose}
            btnText='Сохранить'
            save='Сохранение...'
            onSubmitForm={handleSubmit}
            formValid={formValid}
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
                    onChange={handleChangeName}
                    onBlur={blurHandler}
                    required
                />
                {(nameDirty && nameError) && <div className="error">{nameError}</div>}
                <input
                    className="form__input form__input_type_job"
                    type="text"
                    id="job"
                    name="job"
                    placeholder="Введите вашу профессию"
                    minLength="2"
                    maxLength="200"
                    value={description || ''}
                    onChange={handleChangeDescription}
                    onBlur={blurHandler}
                    required
                />
                {(jobDirty && jobError) && <div className="error error_below">{jobError}</div>}
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
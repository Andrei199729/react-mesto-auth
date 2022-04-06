import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const [avatar, setAvatar] = useState('');
    const [avatarError, setAvatarError] = useState('Обновите аватар');
    const [avatarDirty, setAvatarDirty] = useState(false);
    const [formValid, setFormValid] = useState(false);

    useEffect((e) => {
        setAvatar('');
        setAvatarError('');
        if (props.isOpen) {
            setFormValid(true);
        }
    }, [props.isOpen]);

    useEffect(() => {
        if (avatarError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [avatarError]);

    function handleChangeAvatar(e) {
        setAvatar(e.target.value);
        if (!e.target.validity.valid) {
            setAvatarError('Введите URL');
            if (!e.target.value) {
                setAvatarError('Название карточки не должно быть пустым');
            }
        } else {
            setAvatarError('');
        }
    }

    function handleSubmit() {
        props.onUpdateAvatar({ avatar });
        props.onClose();

        console.log(formValid)
    }

    function blurHandler(e) {
        switch (e.target.name) {
            case 'avatar':
                setAvatarDirty(true);
                break;
        }
    }

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='avatar'
            isOpen={props.isOpen}
            onClose={props.onClose}
            btnText='Сохранить'
            save='Сохранение...'
            onSubmitForm={handleSubmit}
            formValid={avatar && formValid}
        >
            <div className="form__column">
                <input
                    className="form__input form__input_link_avatar"
                    type="url"
                    id="avatar"
                    name="avatar"
                    placeholder="Ссылка на аватар"
                    value={avatar}
                    onChange={handleChangeAvatar}
                    onBlur={blurHandler}
                    required
                />
                {(avatarDirty && avatarError) && <div className="error error_below-avatar">{avatarError}</div>}
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
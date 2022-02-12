import React, { createRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const refInput = createRef();

    function handleSubmit(e) {
        e.preventDefault();
        const link = refInput.current.value;
        props.onUpdateAvatar({
            avatar: link,
        });
    }

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='avatar'
            isOpen={props.isOpen}
            onClose={props.onClose}
            btnText='Сохранить'
            onSubmitForm={handleSubmit}
        >
            <div className="form__column">
                <input
                    className="form__input form__input_link_avatar"
                    type="url"
                    id="avatar"
                    name="avatar"
                    placeholder="Ссылка на аватар"
                    ref={refInput}
                    required
                />
                <span className="error error_below-avatar" id="avatar-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
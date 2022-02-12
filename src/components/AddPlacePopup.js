import React, { createRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const refInputName = createRef();
    const refInputLink = createRef();

    function handleSubmit(e) {

        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        const inputDataName = refInputName.current.value;
        const inputDataLink = refInputLink.current.value;

        props.onAddPlace({
            name: inputDataName,
            link: inputDataLink
        });
    }

    return (
        <PopupWithForm
            title='Новое место'
            name='add'
            isOpen={props.isOpen}
            onClose={props.onClose}
            btnText='Создать'
            creation='Создание...'
            onSubmitForm={handleSubmit}
        >
            <div className="form__column">
                <input
                    className="form__input form__input_card_name"
                    type="text"
                    id="card"
                    name="card"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    ref={refInputName}
                    required
                />
                <span className="error" id="card-error"></span>
                <input
                    className="form__input form__input_link_picture"
                    type="url"
                    id="link"
                    name="link"
                    placeholder="Ссылка на картинку"
                    ref={refInputLink}
                    required
                />
                <span className="error error_below" id="link-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])

    function handleSubmit(e) {

        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        props.onAddPlace({
            name,
            link
        });
        props.onClose();
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
                    onChange={e => setName(e.target.name)}
                    value={name}
                    required
                />
                <span className="error" id="card-error"></span>
                <input
                    className="form__input form__input_link_picture"
                    type="url"
                    id="link"
                    name="link"
                    placeholder="Ссылка на картинку"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    required
                />
                <span className="error error_below" id="link-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
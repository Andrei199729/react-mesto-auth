import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [cardError, setCardError] = useState('Введите название карточки');
    const [linkError, setLinkError] = useState('Введите URL');
    const [cardDirty, setCardDirty] = useState(false);
    const [linkDirty, setLinkDirty] = useState(false);
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    useEffect(() => {
        if (cardError || linkError) {
            setFormValid(false);
        } else {
            setFormValid(true)
        }
    }, [cardError, linkError]);

    function handlerChangeName(e) {
        setName(e.target.value);
        if (!e.target.validity.valid && e.target.value.length < 2 || e.target.value.length > 30) {
            setCardError('Введите название карточки. Название должно быть длинее 2 и меньше 30');
            if (!e.target.value) {
                setCardError('Название карточки не должно быть пустым');
            }
        } else {
            setCardError('');
        }
    }

    function handlerChangeLink(e) {
        setLink(e.target.value);
        if (e.target.value.length < 2 || e.target.value.length > 200) {
            setLinkError('Введите URL');
            if (!e.target.value) {
                setLinkError('URL не может быть пустым');
            }
        } else {
            setLinkError('');
        }
    }

    function handleSubmit() {
        props.onAddPlace({
            name,
            link
        });
        props.onClose();
    }

    function blurHandler(e) {
        switch (e.target.name) {
            case 'card':
                setCardDirty(true);
                break;
            case 'link':
                setLinkDirty(true);
                break;
        }
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
            formValid={formValid}
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
                    onChange={handlerChangeName}
                    onBlur={blurHandler}
                    value={name}
                    required
                />
                {(cardDirty && cardError) && <div className="error">{cardError}</div>}
                <input
                    className="form__input form__input_link_picture"
                    type="url"
                    id="link"
                    name="link"
                    placeholder="Ссылка на картинку"
                    value={link}
                    onChange={handlerChangeLink}
                    onBlur={blurHandler}
                    required
                />
                {(linkDirty && linkError) && <div className="error error_below">{linkError}</div>}
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
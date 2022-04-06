import React, { useEffect, useState } from "react";

function PopupWithForm(props) {
    const [isToggleOn, setToggleOn] = useState(false);

    useEffect(() => {
        if (props.isOpen) {
            setToggleOn(false);
        }
    }, [props.isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        props.onSubmitForm();
        setToggleOn(prev => ({ isToggleOn: !prev.isToggleOn }));
    }
    return (
        <div className={`popup popup_type_${props.name} popup_transition ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onClose}>
            <div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
                <button className={`popup__close-btn popup__close-btn-${props.name}`} type="button" onClick={props.onClose}></button>
                <form className={`form form_type_${props.name}`} name={props.name} onSubmit={handleSubmit}>
                    <h2 className="form__title">{props.title}</h2>
                    {props.children}
                    <button className={`form__btn form__btn-close-${props.name} popup__button_disabled`} type="submit" disabled={!props.formValid}>
                        {!isToggleOn ? props.btnText : (props.creation || props.delete || props.save)}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default PopupWithForm;
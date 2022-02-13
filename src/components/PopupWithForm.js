import React from "react";

function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name} popup_transition ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onClose}>
            <div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
                <button className={`popup__close-btn popup__close-btn-${props.name}`} type="button" onClick={props.onClose}></button>
                <form className={`form form_type_${props.name}`} name={props.name} onSubmit={props.onSubmitForm}>
                    <h2 className="form__title">{props.title}</h2>
                    {props.children}
                    <button className={`form__btn form__btn-close-${props.name}`} type="submit">
                        {props.btnText}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default PopupWithForm;
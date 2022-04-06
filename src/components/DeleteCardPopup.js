import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setFormValid(true)
    }, [props.isOpen]);

    function handleSubmit(e) {
        props.onCardDelete(props);
        props.onClose();
    }

    return (
        <PopupWithForm
            title='Вы уверены?'
            name='delete'
            btnText='Да'
            delete='Удаление...'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmitForm={handleSubmit}
            formValid={formValid}
        />
    );
}

export default DeleteCardPopup;
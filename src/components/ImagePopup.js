import React from "react";

function ImagePopup(props) {
    return (
        <div className={`popup popup_view-image popup_transition ${props.view ? 'popup_view-image_opened' : ''} `} onClick={props.onClose}>
            <figure className="view-image" onClick={(evt) => evt.stopPropagation()}>
                <button className="popup__close-btn popup__close-btn_view-image" type="button" onClick={props.onClose}></button>
                <img className="view-image__picture" src={props.card.link} alt={props.card.name} />
                <figcaption className="view-image__caption">{props.card.name}</figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;
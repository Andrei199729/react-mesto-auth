import React from 'react';

function InfoTooltip(props) {
    return (
        <>
            <div className={`popup popup_infotooltip popup_transition ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onClose}>
                <div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
                    <button className="popup__close-btn popup__close-btn-add" type="button" onClick={props.onClose}></button>
                    <div className="infotooltip__content">
                        <img className="infotooltip__image" src={props.union.union} alt="good" />
                        <p className="infotooltip__text">{props.union.text}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoTooltip;
import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {

    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__btn ${isLiked ? 'element__btn_like_active' : ''}`
    );

    function handleClick() {
        props.onCard(props);
    }

    function handleClickDeleteCard() {
        props.onCardDelete(props);
    }

    return (
        <article className="element">
            <img className="element__image" src={props.link} alt={props.name} onClick={handleClick} />
            <button className={cardDeleteButtonClassName} onClick={handleClickDeleteCard}></button>
            <div className="element__text">
                <h2 className="element__title">{props.name}</h2>
                <div>
                    <button className={cardLikeButtonClassName} type="button" onClick={() => props.onCardLike(props)} ></button>
                    <p className="element__check">{props.likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;
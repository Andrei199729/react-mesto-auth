import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    return (
        <>
            <main className="content">
                {/* <!-- Profile --> */}
                <section className="profile">
                    <div className="profile__edit-avatar" onClick={props.onEditAvatar}>
                        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
                        <span className="profile__edit-pencile"></span>
                    </div>
                    <div className="profile__columns">
                        <div className="profile__info">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <p className="profile__subtitle">{currentUser.about}</p>
                        </div>
                        <button className="profile__edit-btn" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <button className="profile__add-card-btn" type="button" onClick={props.onAddPlace}></button>
                </section>
                {/* <!-- /Profile -->*/}

                {/* <!-- Elements -->  */}
                <section className="elements">
                    {props.cards.map((card) => <Card
                        key={card._id}
                        {...card}
                        onCard={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />)
                    }
                </section>
                {/* <!-- /Elements --> */}

            </main>
        </>
    );
}
export default Main;
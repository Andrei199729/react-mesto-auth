import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth";
import InfoTooltip from './InfoTooltip';

import unionTrue from '../images/union.svg';
import unionFalse from '../images/unionerror.svg';


import ProtectedRoute from "./ProtectedRoute";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isViewOpen, setViewOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [isData, setData] = useState({});
  const history = useHistory();

  useEffect(() => {
    Promise.all([api.getAboutUser(), api.getInitialCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch(err => console.log(err))
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.examinationValidationToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push('/');
          }
        })
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history])

  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(cards.filter((c) => c._id !== card._id)))
      .catch(err => console.log(err))
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setViewOpen(false);
    setInfoTooltip(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setViewOpen(true);
  }

  function handleUpdateUser(user) {
    api.editProfile(user)
      .then(user => setCurrentUser(user))
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then(item => setCurrentUser(item))
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then(card => setCards([card, ...cards]))
      .catch(err => console.log(err))
  }

  function handleRegistration(formData) {
    auth.register(formData.email, formData.password)
      .then((res) => {
        if (res) {
          handleInfoTooltip({ union: unionTrue, text: 'Вы успешно зарегистрировались!' });
          history.push('/signin');
        }
      })
      .catch((err) => err && (handleInfoTooltip({ union: unionTrue, text: 'Пользователь с таким email уже зарегистрирован!' }), history.push('/signin')))
  }

  function handleAuthorization(formData) {
    auth.authorization(formData.email, formData.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          setEmail(formData.email);
          handleInfoTooltip({ union: unionTrue, text: 'Вы успешно авторизованы!' });
          history.push('/');
        }
      })
      .catch(err => err && handleInfoTooltip({ union: unionFalse, text: 'Что-то пошло не так! Попробуйте ещё раз.' }));
  }

  function handleInfoTooltip(data) {
    setInfoTooltip(true);
    setData({ ...data });
  }

  function logout() {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
    history.push('/signin');
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} logout={logout} loggedIn={loggedIn} />
        <Switch>
          <ProtectedRoute
            exact path='/'
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={() => setEditProfilePopupOpen(true)}
            onAddPlace={() => setAddPlacePopupOpen(true)}
            onEditAvatar={() => setEditAvatarPopupOpen(true)}
            onCardClick={(item) => handleCardClick(item)}
            cards={cards}
            onCardLike={(card) => handleCardLike(card)}
            onCardDelete={(card) => handleCardDelete(card)}
          />
          <Route path='/signin'>
            <Login
              handleAuthorization={handleAuthorization}
            />
          </Route>
          <Route path='/signup'>
            <Register
              handleRegistration={handleRegistration}
            />
          </Route>
          <Route exact path='/'>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={(user) => handleUpdateUser(user)} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={(avatar) => handleUpdateAvatar(avatar)} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={(newCard) => handleAddPlaceSubmit(newCard)} />
        {/*<!-- Modal delete --> */}
        <PopupWithForm
          title='Вы уверены?'
          name='delete'
          btnText='Да' />
        {/* <!-- /Modal delete --> */}
        <ImagePopup
          card={selectedCard}
          view={isViewOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          loggedIn={loggedIn}
          union={isData}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

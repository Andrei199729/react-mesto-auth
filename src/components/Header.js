import React from "react";
import { Link, useLocation } from "react-router-dom";
import mestoLogo from '../images/mestologo.svg';

function Header(props) {
    const put = <Link className="header__link" to='/signin'>Войти</Link>;
    const exit = <Link className="header__link" to='/' onClick={props.logout}>Выйти</Link>;
    const register = <Link className="header__link" to='/signup'>Регистрация</Link>;
    const location = useLocation();

    return (
        <header className="header">
            <img className="header__logo" src={mestoLogo} alt="Место" />
            <div className="header__row">
                <p className="header__email">{props.email}</p>
                {location.pathname === '/signup' && put}
                {location.pathname === '/signin' && register}
                {props.loggedIn && exit}
            </div>
        </header >
    );
}
export default Header;
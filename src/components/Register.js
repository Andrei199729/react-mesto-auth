import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.handleRegistration(formData);
    }

    return (
        <>
            <div className="authentication">
                <h2 className="authentication__title">Регистрация</h2>
                <form className="authentication__form" action="/" method="PATCH" name="formregister" onSubmit={handleSubmit}>
                    <input
                        className="authentication__input"
                        id="emailregister"
                        type="email"
                        name="email"
                        placeholder="Email"
                        minLength="2"
                        maxLength="40"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="authentication__input"
                        id="passwordregister"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        minLength="8"
                        maxLength="200"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button className="authentication__btn" type="submit">Зарегистрироваться</button>
                </form>
                <div className="authentication__signin">
                    <p className="authentication__signin-paragraph">Уже зарегистрированы?<Link className="authentication__login-link"
                        to='/signin'>Войти</Link></p>
                </div>
            </div>
        </>
    );
}
export default Register;
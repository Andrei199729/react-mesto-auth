import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (!e.target.validity.valid && e.target.value.length < 8 || e.target.value.length > 20) {
            setEmailError('Некорректный email');
        } else {
            setEmailError('');
        }

        if (e.target.value.length <= 6 || e.target.value.length >= 20) {
            setPasswordError('Пароль должен быть длинее 6 и меньше 20');
            if (!e.target.value) {
                setPasswordError('Пароль не может быть пустым');
            }
        } else {
            setPasswordError('');
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.handleRegistration(formData);
    }

    function blurHandler(e) {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
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
                        onBlur={blurHandler}
                        required
                    />
                    {(emailDirty && emailError) && <div className="error error_position">{emailError}</div>}
                    <input
                        className="authentication__input"
                        id="passwordregister"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        minLength="6"
                        maxLength="200"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={blurHandler}
                        required
                    />
                    {(passwordDirty && passwordError) && <div className="error error_position error_position-bottom">{passwordError}</div>}
                    <button className="authentication__btn" type="submit" disabled={!formValid}>Зарегистрироваться</button>
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
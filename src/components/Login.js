import React, { useState } from "react";

function Login(props) {
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
        if (!formData.email || !formData.password) {
            return;
        }
        props.handleAuthorization(formData);
        setFormData({ email: '', password: '' });
    }

    return (
        <>
            <div className="authentication">
                <h2 className="authentication__title">Вход</h2>
                <form className="authentication__form" action="/" method="PATCH" name="formlogin" onSubmit={handleSubmit}>
                    <input
                        className="authentication__input"
                        id="emaillogin"
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
                        id="passwordlogin"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        minLength="8"
                        maxLength="200"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button className="authentication__btn" type="submit" onSubmit={handleSubmit}>Войти</button>
                </form>
            </div>
        </>
    );
}

export default Login;
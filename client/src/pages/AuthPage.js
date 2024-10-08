import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useMassage } from '../hooks/useMessage'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


export const AuthPage = () => {
    const { loading, request, error, clearError } = useFetch()
    const { login } = useAuth();
    const navigate = useNavigate();

    const message = useMassage();

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        window.M.updateTextFields() //materialize object M
    }, [])

    useEffect(() => {
        message(error)
        clearError();
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })

        } catch (e) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            login(data.token, data.userId);
            navigate('/create')

        } catch (e) { }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>MERN </h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">

                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{ marginRight: 10 }}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Sign in
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
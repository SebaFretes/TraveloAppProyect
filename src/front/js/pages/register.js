import React from "react";
import { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css'


export const Register = () => {
    const { store, actions } = useContext(Context)

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        if (newPassword.length >= 5) {
            setPasswordError('');
        } else {
            setPasswordError('La contraseña debe tener al menos 5 caracteres.');
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (passwordError) {
            return;
        }
        const open = await actions.handleSubmit({ username, email, password }, navigate);
        if (open) {
            setUsername('')
            setEmail('')
            setPassword('')
            navigate('/login');
        }
    };

    return <div className='fatherLogin'>
        <div className='imageToLogin'>
            <img style={{ marginLeft: "50px" }} src='https://ps.w.org/login-customizer/assets/icon-256x256.png?rev=2455454' width={"100px"} height={"100px"} />
        </div>
        <div style={{ textAlign: "center" }}>
            <h2>Register</h2>

            <form style={{ background: "transparent" }} onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10">
                            <input style={{ width: "315px", borderRadius: "22px" }}
                                type="text" className="form-control form-control-lg colorStyle" placeholder="Full Name"
                                value={username}
                                onChange={handleUsernameChange}

                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-10">
                            <input style={{ width: "315px", borderRadius: "22px" }}
                                type="email" className="form-control form-control-lg colorStyle" placeholder="email"
                                value={email}
                                onChange={handleEmailChange}

                            />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-10 ">
                            <input style={{ width: "315px", borderRadius: "22px" }}
                                type="password" id="validationTooltip01" required className="form-control form-control-lg colorStyle " placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}

                            />
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-10">
                        {passwordError && (
                            <div style={{ color: 'red', marginTop: '5px' }}>{passwordError}</div>
                        )}
                    </div>
                </div>
                {/* <Link to={"/login"}> */}
                <button type="submit" className='loginBoton'>Register</button>
                {/* </Link> */}
            </form>

        </div>
    </div>
}
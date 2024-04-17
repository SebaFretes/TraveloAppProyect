import React from "react";
import { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css'


export const Register = () => {
    const { store, actions } = useContext(Context)

    const navigate = useNavigate()

    const [fullName , setFullName] =useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const handleFullNameChange =(event)=>{
        setFullName (event.target.value)
    }

    const handleEmailChange = (event)=>{
        setEmail(event.target.value)
    }
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = {
            username: fullName,
            email: email,
            password: password
        };
        const open = await actions.handleSubmit(form, navigate);
        if (open) {
            navigate('/login');
        }
    };

    return <div className='fatherLogin'>
        <div className='imageToLogin'>
            <img style={{ marginLeft: "50px" }} src='https://ps.w.org/login-customizer/assets/icon-256x256.png?rev=2455454' width={"100px"} height={"100px"} />
        </div>
        <div style={{ textAlign: "center" }}>
            <h2>Register</h2>

            <form>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10">
                            <input style={{ width: "315px", borderRadius: "22px" }}
                             type="text" className="form-control form-control-lg colorStyle" placeholder="Full Name" 
                             value={fullName}
                             onChange={handleFullNameChange}
                             
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
                    <div className="row">
                        <div className="col-sm-10">
                            <input style={{ width: "315px", borderRadius: "22px" }} 
                            type="password" className="form-control form-control-lg colorStyle"  placeholder="Password" 
                            value={password}
                            onChange={handlePasswordChange}
                            
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className='loginBoton' onClick={() => handleSubmit()}>Register</button>
            </form>
            {/* <button  className='loginBoton'>Register</button> */}
        </div>
    </div>
}
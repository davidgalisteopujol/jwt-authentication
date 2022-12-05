import React, { useState, useContext } from "react";
import {Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const Login = () => {

    const {store, actions} = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)

    const navigate = useNavigate()

    console.log("This is your token", store.token)

    const handleClick = () => {
    if (isValidEmail && isValidPassword )

        actions.login(email, password)
        
    }

    if (store.token && store.token != "" && store.token != undefined){
        navigate("/private")}


let schemaEmail = yup.object().shape({
    email:yup.string().email()  //Valida que es un email al ponerle la extension de email
        .required("Required")
})

let schemaPassword = yup.object().shape({
    password:yup.string()
    .min(6,"Too short!")
    .max(10,"too long!")
    .required("Required")
})

const handleBlurEmail =(e)=> {
    schemaEmail.validate({email:e.target.value})
    .then(value => setIsValidEmail(true))
    .catch((error)=>{setIsValidEmail(false)})
}

const handleBlurPassword =(e)=> {
    schemaPassword.validate({password:e.target.value})
    .then(value => setIsValidPassword(true))
    .catch((error)=>{setIsValidPassword(false)})
}

    return (
        <div>
            <h1 className="text-center">Login</h1>
            {(store.token && store.token != "" && store.token !=undefined) ? ("You are logged in with this token "+store.token) :(

            <div className="d-flex justify-content-center mt-3"> 

                <label className="form-label"></label>
                <input className={`form-control ${isValidEmail ? "" : "is-invalid"}`} required onBlur={handleBlurEmail} type = "text" id="email" placeholder="Email" onChange = {(e)=>setEmail(e.target.value)} value = {email}/>
                {/* <div classname="invalid-feedback">Please provide a valid Email.</div> */}

                <label className="form-label"></label>
                <input className={`form-control ${isValidPassword ? "" :"is-invalid"}`} required onBlur={handleBlurPassword} type ="password" id="password" placeholder="Password" onChange = {(e)=>setPassword(e.target.value)} value = {password}/>
                {/* <div classname="invalid-feedback">Please provide a valid Password.</div> */}

                <button onClick={handleClick}>Send</button>
                
            </div>
            )}
        </div>
    )
}

export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const Signup = () => {

    const navigate = useNavigate()
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)

    var info = {}

    const sendInfo = () => {
        info.email = document.getElementById("email").value
        info.password = document.getElementById("password").value
        console.log("Esta es mi info", info)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(info);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(process.env.BACKEND_URL+"/api/signup", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


        if (isValidEmail && isValidPassword ){
            navigate("/login")
        }
        
    }


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
        <div >
            <h2 classname="text-center">Sign up</h2>

            <div classname="d-flex justify-content-center mt-3">

                <label className="form-label"></label>
                <input className={`form-control ${isValidEmail ? "" : "is-invalid"}`} required onBlur={handleBlurEmail} type = "text" id="email" placeholder="Email" />
                {!isValidEmail && (<div className="invalid-feedback">Email is invalid</div>)}

                <label className="form-label"></label>
                <input className={`form-control ${isValidPassword ? "" :"is-invalid"}`} required onBlur={handleBlurPassword} type ="password" id="password" placeholder="Password" />
                {!isValidPassword && (<div className="invalid-feedback">Password must be at least 10 characters long and alphanumeric </div>)}

                <button onClick={()=>{sendInfo()}}>Send</button>

            </div>
        </div>
    )
}

export default Signup;
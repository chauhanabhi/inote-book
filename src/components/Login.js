import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const history = useNavigate()
    const [credentials, steCredentials] = useState({email:"",password:""})

const host = "http://localhost:5000";

 const handleSubmit = async (e) =>{
     e.preventDefault();

     const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password}),
    });   
    const json = await response.json();
    console.log(json);
    if(json.success){

        localStorage.setItem('token', json.authtoken);
        history("/home")
        props.showAlert("Login Successfully","success")
    }else{
        props.showAlert("Invalid details","danger")
    }
 }

 const changeHadler = (e) => {   
    steCredentials({...credentials, [e.target.name]: e.target.value});
  }

  return (
    <>
        <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={changeHadler} value={credentials.email} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={changeHadler} value={credentials.password} name="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </>
  )
}

export default Login
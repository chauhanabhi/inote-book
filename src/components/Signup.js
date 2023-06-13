import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
const history = useNavigate()
const [credentials, steCredentials] = useState({name:"",email:"",password:"",cpassword:""})
const host = "http://localhost:5000";

  const handleSubmit = async(e) =>{
    e.preventDefault(); 
    const {name,email,password} = credentials;
    const responce = await fetch(`${host}/api/auth/creatauser`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await responce.json();
    console.log(json);

    if(json.success){
      localStorage.setItem("token",json.authtoken);
      history("/home");
      props.showAlert("Acount created successfully","success")
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
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlfor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={changeHadler}  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={changeHadler} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={changeHadler} name="password"/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="cpassword" onChange={changeHadler} name="c
            password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </>
    
  )
}

export default Signup
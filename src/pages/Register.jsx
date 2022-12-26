import React, {useState} from 'react';
import styled from "styled-components"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.svg"
import toast from "react-hot-toast";
import { registerRoute } from '../utils/APIRoutes';

function Register(props) {
    const navigate = useNavigate();
 const [values, setvalues]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
 })

    const handleChange=(e)=>{
        setvalues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
          const { email, username, password } = values;
          const { data } = await axios.post(registerRoute, {
            username,
            email,
            password,
          });
    
          if (data.status === false) {
            toast.error(data.msg);
            return
          }
          toast.success("success");
          if (data.status === true) {
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(data.user)
            );
            navigate("/chat");
          }
        }
      };
    
    const handleValidation=()=>{
    const {password, confirmPassword, email, username}=values
    if(password !== confirmPassword){
        toast.error("Password and confirm password should be thesame")
        return false
    } else if(username.length<=3){
        toast.error("Username is required and should be greater than 3 characters")
        return false
    }else if(password.length<=8){
        toast.error("Password should be greater than 3 characters")
        return false
    }else if(email===""){
        toast.error("Email is required")
        return false
    }
    return true
}
    return (
        <>
        <FormContainer>

            <form onSubmit={(e)=>handleSubmit(e)}>
                {/* <pre className='text-white'>{JSON.stringify(values, null, 2)}</pre> */}
                <div className="brand">
                    <img src={Logo} alt='logo'/>
                    <h1>Snappy</h1>
                </div>
                <input 
                type="text" 
                placeholder='Enter username' 
                name='username'
                onChange={(e)=>handleChange(e)}
                />
                 <input 
                type="email" 
                placeholder='Enter Emial' 
                name='email'
                onChange={(e)=>handleChange(e)}
                />
                <input 
                type="password" 
                placeholder='Enter password' 
                name='password'
                onChange={(e)=>handleChange(e)}
                />
               
                <input 
                type="password" 
                placeholder='Enter confirm password' 
                name='confirmPassword'
                onChange={(e)=>handleChange(e)}
                />

                <button type='submit'>
                    Create User
                </button>
                <span>Already have an account ? <Link to="/Login">Login</Link> </span>
            </form>
        </FormContainer>
        </>
    );
}


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4E0EFF9F;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
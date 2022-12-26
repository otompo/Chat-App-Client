import React,{useEffect} from 'react';
import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom';

function Home(props) {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
            navigate("/chat");      
      },[]);

    return (
        <Container>
             <Link to="/login"> <h1>Login</h1></Link>
             <Link to="/register"> <h1>Register</h1></Link>
           
        </Container>
    );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  h1{
    color:white
  }
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Home;
import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Home(props) {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
            navigate("/chat");      
      },[]);

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Home;
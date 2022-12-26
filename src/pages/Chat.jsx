import React, {useEffect, useState, useRef} from 'react';
import styled from "styled-components"
import axios from "axios"
import { io } from "socket.io-client";
import { Link, useNavigate } from 'react-router-dom';
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { allUsersRoute, host } from '../utils/APIRoutes';

function Chat(props) {
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts]=useState([])
    const [currentUser, setCurrentUser]=useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined);
    
    useEffect( () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/login");
        } else {
          setCurrentUser(
             JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )
          );
        }
      }, []);
      useEffect(() => {
        if (currentUser) {
          socket.current = io(host);
          socket.current.emit("add-user", currentUser._id);
        }
        getCurrentuser()
      }, [currentUser]);

    const getCurrentuser=async () => {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
          } else {
            navigate("/setAvatar");
          }
        }
        }
    const handleChatChange = (chat) => {
            setCurrentChat(chat);
        };
    return (
        <Container>
            <div className='container'>
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {currentChat === undefined ? (
                <Welcome />
            ) : (
                <ChatContainer currentChat={currentChat} socket={socket}/>            
            )} 
            </div>
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
export default Chat;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usersRoute } from '../utils';
import { IUser } from '../interfaces';
import { Contacts } from '../layouts';
import { ChatContainer } from '../components';

function Chat() {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [contacts, setContacts] = useState<IUser[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userInfo = localStorage.getItem('snappy-chat-user');
    if (!userInfo) {
      navigate('/login');
    } else {
      setCurrentUser(JSON.parse(userInfo));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        getAllContacts();
      } else {
        navigate('/set-avatar');
      }
    }
  }, [currentUser]);

  const getAllContacts = async () => {
    const { data } = await axios.get(usersRoute);
    setContacts(data.users);
  }

  return (
    <ChatContainer>
      <Contacts contacts={contacts} currentUser={currentUser} />
    </ChatContainer>
  )
}

export default Chat;
import React, { useState,useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { getAccessToken } from '../common/utils';


Chat.propTypes = {
    socket:PropTypes.any.isRequired,
    
}


function Chat(props) {
    const [socket, setSocket] = useState(null);
    const connectSocket = () => {

        
        const newSocket = io(process.env.REACT_APP_BASE_URL);
        setSocket(newSocket);
        
        //return () => newSocket.close();
    }

    const initSocket = () => {
        
        socket.on('message', message => {
            console.log(message)
            
        })

        socket.on('pendingRooms', message => {
            console.log(message)
            
        })

    }

    useEffect(() => {
      if(socket){
          
          console.log('success connect!')
          
          initSocket()
      }
    }, [socket]);
    
  
    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        connectSocket();
        addResponseMessage(newMessage)
        if(socket){
            socket.emit('checkPendingRooms');
            socket.emit('newMessage', newMessage);
        }
      
        // Now send the message throught the backend API
    };

    return (

        <Widget handleNewUserMessage={handleNewUserMessage}
            title="Pet Finder chat" />
    )
}


export default Chat
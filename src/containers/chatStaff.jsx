import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage, setQuickButtons } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { getAccessToken, getRole } from '../common/utils';
import { useCookies } from 'react-cookie';
import { withCookies, Cookies } from 'react-cookie';

const buttons = [ { label: 'refresh', value: 'refresh' }];


Chat.propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired
  };


function Chat(props) {
    const [socket, setSocket] = useState(null); 
    const { cookies } = props;
    

    const connectSocket = () => {
        //not need new socket if exists
        console.log(cookies)

        if (getAccessToken()) {
            const newSocket = io(process.env.REACT_APP_BASE_URL, {
                query: {
                    token: getAccessToken(),
                    roomId: getRoomID()
                },
                transports: ["websocket"] 
            });
            setSocket(newSocket);

        } 
        //return () => newSocket.close();
    }

    const initSocket = () => {

        
        socket.on('getGuest', data => {
                addResponseMessage(data.firstName + ": " + data.msg)
        })
        

        socket.on('exitClientUser', msg => {
            console.log('exitClientUser',msg)
            addResponseMessage(msg)

        })
        socket.on('getRoom', data => {
            console.log('room',data)
            cookies.set('room',data)
        })

       

    }

    const getRoomID = () =>{
        if(cookies.get("room")){
            return cookies.get("room")
        }

        return ''
    }

    const destroySocket = () => {

        if (!socket) {
            return
        }
        // if(getRole() === 'staff'){
        //     socket.off('get_guest')
        // }else{
        //     socket.off('get_staff')
        // }

        socket.off('getGuest')
        socket.off('getStaff')
        socket.off('getRoom')
   
        
        
        socket.close()

    }


    useEffect(() => {

        if (!socket) {
            

            if(getRoomID()){
                setQuickButtons(buttons.filter(button => button.value == 'refresh'));
                connectSocket()
            }else{
                connectSocket()
            }
            
        }


        if (socket) {

            initSocket()


        }
        return () => destroySocket()

    }, [socket]);

    const handleQuickButtonClicked = data => {
        
  

        if (data == "refresh") {            
            socket.emit('staffDisconnect', { roomId: getRoomID() })
            cookies.remove('room')
            setTimeout(()=>{
                connectSocket() //connect again
            },500)
            
        }

        

    };


    const handleNewUserMessage = (newMessage) => {

        if (socket) {
            
                socket.emit('staffMsg', { roomId: getRoomID(), msg: newMessage })
         
        }

        // Now send the message throught the backend API
    };

    return (

        <Widget handleQuickButtonClicked={handleQuickButtonClicked} handleNewUserMessage={handleNewUserMessage} subtitle={'Welcome to the chat ' + getRoomID()?getRoomID():''}  title="Customer Services(Staff)"  showAvatar={true} />

    )
}


export default withCookies(Chat)
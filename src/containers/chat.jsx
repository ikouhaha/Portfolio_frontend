import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage, setQuickButtons } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { getAccessToken, getRole } from '../common/utils';
import { withCookies, Cookies } from 'react-cookie';

const buttons = [{ label: 'start', value: 'start' }, { label: 'end', value: 'end' }];


Chat.propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired
  };

function Chat(props) {
    const [socket, setSocket] = useState(null);    
    const { cookies } = props;

    const connectSocket = () => {
        //not need new socket if exists


        if (getAccessToken()) {
            const newSocket = io(process.env.REACT_APP_BASE_URL, {
                query: {
                    token: getAccessToken(),
                    roomId: getRoomID()
                    
                },
                transports: ["websocket"] 
            });
            setSocket(newSocket);

        } else {
            //guest room id
            const newSocket = io(process.env.REACT_APP_BASE_URL,{
                query: {
                    
                    roomId: getRoomID()
                    
                },
                transports: ["websocket"] 
            });
            setSocket(newSocket);
        }
        //return () => newSocket.close();
    }

    const initSocket = () => {


        socket.on('getStaff', data => {
            console.log('getStaff',data)
            addResponseMessage(data.firstName + ": " + data.msg)
        })

        socket.on('onStaffJoin', firstName => {
            addResponseMessage(`Staff ${firstName} has joined the room`)

        })

        socket.on('getPendingUsers', data => {
            if(data>0){
                addResponseMessage(`${data} users is pending`)
            }       
        })


        socket.on('exitStaffUser', msg => {
            console.log('exitStaffUser', msg)
            addResponseMessage(msg)

        })
        socket.on('getRoom', data => {
            console.log('room', data)
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


        socket.off('getStaff')
        socket.off('onStaffJoin')
        socket.off('exitUser')
        socket.off('getRoom')
        socket.off('getPendingUsers')

        
        socket.close()

    }


    useEffect(() => {

        if (!socket) {


            
            if(getRoomID()){
                setQuickButtons(buttons.filter(button => button.value == 'end'));
                connectSocket()
            }else{
                addResponseMessage("please press the button to start chat")
                setQuickButtons(buttons.filter(button => button.value == 'start'));
            }
            


        }


        if (socket) {

            initSocket()


        }
        return () => destroySocket()

    }, [socket]);

    const handleQuickButtonClicked = data => {

        if (data == "start") {
            connectSocket()
            setQuickButtons(buttons.filter(button => button.value == 'end'));
        }

        if (data == "end") {
            socket.emit('clientDisconnect', { roomId: getRoomID() })
            setQuickButtons(buttons.filter(button => button.value == 'start'));
            cookies.remove('room')
        }



    };


    const handleNewUserMessage = (newMessage) => {

        if (socket) {

            socket.emit('guestMsg', { roomId: getRoomID(), msg: newMessage })

        }

        // Now send the message throught the backend API
    };

    return (

        <Widget handleQuickButtonClicked={handleQuickButtonClicked} handleNewUserMessage={handleNewUserMessage} subtitle={'Welcome to the chat ' + getRoomID()?getRoomID():''} title="Customer Services"  showAvatar={true} />

    )
}


export default withCookies(Chat)
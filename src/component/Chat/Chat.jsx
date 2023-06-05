import React, { useEffect, useState } from 'react'
import { Name } from '../Join/Join'
import socketIo from "socket.io-client";
import "./Chat.css";
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
const ENDPOINT="http://localhost:4500/" ;


let socket;

export default function Chat() {
    const [id,setId]=useState("");
    const [message,setMessage]=useState([]);

    const send=()=>{
        const message=document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
        document.getElementById('chatInput').value="";

    }

    useEffect(() => {
        socket=socketIo(ENDPOINT,{transports:['websocket']});
        //  console.log("here");
        socket.on('connect',()=>{
            setId(socket.id);
        // alert("connected")
      })
      socket.emit('joined',{Name});
      socket.on('welcome',(data)=>{
        console.log("here it is coming welcome")
        setMessage([...message,data]);
        console.log(data.user,data.message);
      })

      
    return ()=>{
        socket.emit('disconnect');
        socket.off();
    }
    }, [])

    useEffect(() => {
      socket.on('sendMessage',(data)=>{
        setMessage([...message,data]);
        console.log(data.user,data.message,data.id);
      })
      socket.on('leave',(data) => {
        // console.log("here it is coming userleft")
        console.log("hello leave")
        setMessage([...message,data]);
        console.log(data.user,data.message);
      });
      socket.on('userJoined',(data)=>{
        // console.log("here it is coming userJoined");
        setMessage([...message,data]);
        console.log(data.user,data.message);
      })
    
      return () => {
        socket.off();
      }
    }, [message])
    
    
    function handleSubmit(e){
        e.preventDefault();
        console.log("here");
        send();
    }
    console.log(message);
  return (
    <div className="chatPage">
        <div className="chatContainer">
            <div className="header">
                <div className='headerTitle'><h2>Jchat</h2></div>
                <div className='headerClose'><a href="/"><h2>Close</h2></a> </div>
                
               
                {/* <img src={closeIcon} alt="Close"/> */}
            </div>
            <ReactScrollToBottom className="chatBox" srx={{
                backgroundColor:"white"
            }}>
                {message.map((item,index) => <Message key={index} user={item.id === id ? '':item.user} message={item.message} classs={item.id === id ? 'right':'left'}/>)}
            </ReactScrollToBottom>
            <form onSubmit={e=>handleSubmit(e)}>
            <div className="inputBox" >
                <input type="text" id='chatInput' className='chatInput' placeholder='Write Something...'/>
                <button className='btn' type='submit'>Send</button>
                
            </div>
            </form>
        </div>
    </div>
  )
}

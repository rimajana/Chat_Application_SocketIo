import React from 'react'

import "./Message.css";

export default function Message({user,message,classs}) {
    if(user){
        if(user==="Admin"){
            {console.log("here");}
            return (
                <div className="middle">
                <div >{message}</div>
                </div>
            )
        }
        else{
        return (
            <div className={`messageBox ${classs}`}>
                {console.log(user)}
                <div style={{color:"white"}}>{user}</div>
                <div >{message}</div>
                {/* {`${user} : ${message}`} */}
            </div>
          )
        }
    }
    else{
  return (
    <div className={`messageBox ${classs}`}>
         <div><h4>You</h4></div>
        <div>{message}</div>
    </div>
  )}
}

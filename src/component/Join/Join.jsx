import React, { useState } from 'react'
import "./Join.css"
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

let Name="Guest";
const Join=()=> {
    const [name,setName]=useState("");
    const navigate = useNavigate();
    // const [name,setName]=useState("Guest")
    // useEffect(() => {
    //     const Name=prompt("Please enter your name","Guest");
    //     setName(Name);
    //     // console.log(name,Name);
    // }, [])
    // // alert("hey");
    // console.log("name is ",name);
    function handleSubmit(e){
        e.preventDefault();
        console.log(name);
        setName("");
        Name=name;
        navigate("/chat");
    }
  return (
    <div className="JoinPage">
        <div className="JoinContainer">
            <h1>J Chat </h1>
            <form className='form-login' onSubmit={handleSubmit}>
                <input type="text" id='JoinInput' placeholder='Enter your Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                <button className='joinbtn' type='submit'>LOGIN</button>
            </form>
        </div>
    </div>
  )
};
export default Join;
export {Name};

import React, { useState, useEffect, useRef } from "react";
import {Link} from "react-router-dom"
import styled from "styled-components";
import{Page,Container} from"./styles"
import io from "socket.io-client";
import {create, list}  from "./user/apiuser";




const Chatrooms = () => {
    const [room,setroom]=useState({
        roomname:"",
        avail:"private"
    })
    const [displayrooms,setrooms]=useState([])
    const showrooms=()=>{
        list().then(data=>{
            data.error=+""
            if(data.error){
                console.log("error")
                
            }else{
                console.log(JSON.stringify(data));
                setrooms(data)
          
            
            }
        })
    }
    
    useEffect(() => {
        showrooms();
    }, [])
    const{roomname,avail}=room;
    const createroom=()=>{
        if(roomname!=""){
        create(roomname).then(data=>{
            if(data.error){
                
            }
            else{
                showrooms();
            }
        })
        }
    }
    
    const handleChange=event=>{
    setroom({...room,avail:event.target.value})
    }
    const handleroom=event=>{
        setroom({...room,roomname:event.target.value})
        }



    return (
        <div>
            <Page>
            <div className="col-3">
                <div className="input-group">
                <input type="text" onChange={handleroom} value={roomname} ></input>
               
{/* <label className="text-muted">public</label>
<select onChange={handleChange}  className="btn text-white" >
<option value="private">No</option>
<option value="public">Yes</option>

</select> */}

<button className="btn text-white" onClick={createroom}>create room</button>

<Container>
{displayrooms.map((m,i)=>{
    return <button key={i} className="btn">
    <Link className="btn text-white" to={{ pathname: `/chat/${m._id}/${m.name}`, state:{id:m._id }, }}
>{m.name}</Link></button>
})}
</Container>

                </div>
                
            </div>
            </Page>
            
        </div>
    )
}

export default Chatrooms

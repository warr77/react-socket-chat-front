

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { isauth,listmsg } from "./user/apiuser";

const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  
  background-color:#58150e;
  flex-direction: column;
`;

const box=styled.div`
display:flex;
flex-direction:coloumn;
width:40%;
height:80%;
background-color:#58150e;
border-color:#DC3522;    
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
  overflow: auto;
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
  background-color:#58150e;
  border-color:#DC3522;
  border-width:2px;
  overflow-y: auto;
  box-shadow: 10px 10px 40px 20px #DC3522;
`;

const TextArea=styled.textarea`
width:500px;
height:40px;
margin-top: 10px;
padding-left: 10px;
padding-top: 10px;
font-size: 17px;
outline: none;
line-height: 20px;
color:#ed968c;
::placeholder {
    color: #ed968c;
  }
`
const MyMessage = styled.div`
  width: 45%;
  
  background-color:#DC3522;
  border-width:2px;
  color: #ed968c;
  padding: 10px;
  margin-right: 2px;
  text-align: center;
  border-radius: 10%;
  margin-buttom 10: 2px;
  margin-top: 10px;
  `
  const Image= styled.img`
  border-radius: 50%;
  width:40px;
  `
  const PartnerMessage = styled.div`
  width: 45%;
  background-color: transparent;
  color: lightgray;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`;
const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;
const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const Heading= styled.h1` font-size: 5.6rem;
text-align: center;
line-height: 1;
color: #59000c;
animation: neon .08s ease-in-out infinite alternate;
@keyframes neon {
    from {
      text-shadow:
      0 0 6px rgba(255,99,71,0.2),
      0 0 30px rgba(255,0,14,0.5),
      0 0 12px rgba(255,0,14,0.9),
      0 0 21px rgba(255,53,14,0.92),
      0 0 34px rgba(255,99,71,0.8),
      0 0 54px rgba(255,12,0,0.92);
    }
    to {
      text-shadow:
      0 0 6px rgba(255,99,71,0.4),
      0 0 30px rgba(255,0,14,0.9),
      0 0 12px rgba(255,0,14,1),
      0 0 22px rgba(255,53,14,1),
      0 0 38px rgba(255,99,71,1),
      0 0 60px rgba(255,12,1,1);
    }
  }`


function Chat(props) {
    const room_number=props.match.params;
    const room_name=props.match.params.name;
    const [yourID, setYourID] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [reload, setreload] = useState(true);
    const user=isauth();
    

  const socket = useRef();
useEffect(()=>{
     socket.current = io.connect("http://localhost:5000/messages");
     
     socket.current.on("connect", id => {
        socket.current.emit('joinroom', {
            room:room_number.id,
            user:user.user.id,
            userPic:"https://i.pinimg.com/originals/9e/a5/ff/9ea5ffd4d2c75d0bceb054c679229af0.png"
        })
         console.log(id);
        setYourID(id);
      })


      socket.current.on("messagefeed", (message) => {
          var msg =JSON.parse(message)
          console.log("recv")
        console.log(msg);
        receivedmsg(msg);
      })
},[])
const messagesEndRef = useRef(null);

useEffect(() => {
    showmsg();
  }, [])
function sendmsg(){
    console.log("message something")
    const messageObject = {
        room_number:room_number.id,
        user:user.user._id,
        userPic:"https://i.pinimg.com/originals/9e/a5/ff/9ea5ffd4d2c75d0bceb054c679229af0.png",
        message:message
      
    };
      setMessage("");
      setMessages(oldmsg=>[...oldmsg,messageObject]);
      socket.current.emit("newMessage", messageObject);
}

function receivedmsg(message){
    setMessages(oldmsg=>[...oldmsg,message]);
}

const handlechange=e=>{
setMessage(e.target.value)
}

const showmsg=()=>{
    listmsg(room_number.id).then((data)=>{
        
        data.map((o,i)=>{
const msgobj={
        user:o.sender,
        message:o.text
}
//console.log(msgobj);
setMessages(oldmsg=>[...oldmsg,msgobj]);

        });
        setreload(false)
    })
}
  
const loaddata=()=>{
    if(reload){
        showmsg();
        

    }
}

const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  
    return (
        <div>
            <h1>Welcome chat! .....chat</h1>
            {yourID}
            
          
            <Page>
                <Heading>{room_name}</Heading>
                    <Container>
                    
                    
            {messages.map((msg,i)=>{
                
                if(msg.user==user.user._id){
                    
                    return(
                <PartnerRow  key={i}>
                    <div>
                
                </div>
                <img src={`http://localhost:5000/img/${msg.user}`}style={{borderRadius:"50%",width:"50px"}} alt="avatar" />
                        <MyMessage > {msg.message}   </MyMessage>
                       

                        <div ref={messagesEndRef} />
                        </PartnerRow >
                       
                        
                      )
                }else{
                   
                return(
                <MyRow key={i}>
                  
                  
                <PartnerMessage > {msg.message}</PartnerMessage>
                <img src={`http://localhost:5000/img/${msg.user}`}style={{borderRadius:"50%",width:"50px"}} alt="avatar" />
                </MyRow>
                
                
                
                    
                    )   
                }
            }) }
          
          
            </Container>
                <center>

                <div className="input-group me-2 ">
                <TextArea placeholder="enter text" value={message}onChange={handlechange}></TextArea>
            <button className="btn mr-3 border text-light" onClick={sendmsg}>Send</button>
                </div>
                </center>
                
            </Page>
        </div>

        
    )
}

export default Chat

import styled from "styled-components";
export const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  
  background-color:#58150e;
  flex-direction: column;
`;

export const box=styled.div`
display:flex;
flex-direction:coloumn;
width:40%;
height:80%;
background-color:#58150e;
border-color:#DC3522;    
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  max-height: 800px;
  overflow: auto;
  
  font-family: arial;
  
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
  background-color:#58150e;
  border-color:#DC3522;
  border-width:2px;
  box-shadow: 10px 10px 40px 20px #DC3522;
`;

export const TextArea=styled.textarea`
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
export const MyMessage = styled.div`
  width: 45%;
  
  background-color:#DC3522;
  border-width:2px;
  color: #46516e;
  padding: 10px;
  margin-right: 2px;
  text-align: center;
  border-radius: 10%;
  margin-buttom 10: 2px;
  margin-top: 10px;
  `
  export const PartnerMessage = styled.div`
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
import react from "react"
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Chat from "./chat"
import Chatrooms from"./chatrooms"
import React from 'react'
import Signup from'./signup'
import Signin from "./signin"
import Menu from"./Menu"
import Proute from"./user/Proute"

const Routes = () => {
    return (
        <BrowserRouter>
        <Menu/>
        <Switch>
            
            <Proute path="/chat/:id/:name" exact component={Chat}/>
            <Proute path="/chatrooms" exact component={Chatrooms}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/signin" exact component={Signin}/>
        </Switch>
        
        </BrowserRouter>
    )
}

export default Routes


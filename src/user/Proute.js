import React ,{Component} from 'react'
import{Route,Redirect} from 'react-router-dom'
import {isauth} from "./apiuser"

const Proute=({component:Component,...rest})=>(
<Route {...rest} render={props=>isauth() ?(
<Component{...props}/>
	):(

<Redirect to={{pathname:"/signin",state:{from: props.location}}}/>

	)
}
/>
);
export default Proute;
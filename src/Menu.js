import React ,{Fragment}from 'react'
import{Link,withRouter} from 'react-router-dom'
import { signout,isauth } from "./user/apiuser";





const isActive=(history,path)=>{
if(history.location.pathname===path){
	return {color:'#ff9900'};
}else{

	return {color:'#ffffff'};
}


	}

const Menu=({history})=>(
<div>
<ul className="nav nav-tabs nav-dark bg-dark">
<li className="nav-item">
<Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link>
</li>
<li className="nav-item">
<Link className="nav-link" style={isActive(history,'/chatrooms')} to="/chatrooms">chatrooms</Link>
</li>




{/* {isauth()&& isauth().user.role===0 &&(

<li className="nav-item">
<Link className="nav-link" style={isActive(history,'/user/Dashboard')} to="/user/Dashboard">Dashboard</Link>
</li>
)} */}
{!isauth() &&(
<Fragment>
<li className="nav-item">
<Link className="nav-link" style={isActive(history,'/signin')} to="/signin">Signin</Link>
</li>
<li className="nav-item">
<Link className="nav-link" style={isActive(history,'/signup')} to="/signup">Signup</Link>
</li>

</Fragment>
	)}





{ isauth() && (

<Fragment>
	<li className="nav-item">
	
<span className="nav-link" style={{cursor:'pointer',color:'#ffffff'}} onClick={
	()=>signout(()=>{
		history.push("/");
	})}>Signout</span>
</li>

</Fragment>

	)}


</ul>
</div>
	);
export default withRouter(Menu);
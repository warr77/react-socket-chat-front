import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import{createUser} from './user/apiuser'


function Signup() {

    const[values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        photo:'',
        formData:'',
        error:"",
        loading:false,
        success:false
    })
    const showSuccess=()=>(
        <div className="alert alert-info" style={{display:success?'':'none'}}>
        new account is created .please signin <Link to="/signin">signin</Link>
    
        </div>
        
    );
const{name,email,password,photo,formData,error,loading,success}=values;
    useEffect(()=>{
        setValues({...values,formData: new FormData()})
    },[])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const clickSubmit=event=>{
        event.preventDefault()
        setValues({...values,error:"",loading:true})
        createUser(formData).then(data=>{
            if(data.error){
            setValues({...values,error:"something went wrong plz check if all fields are filled"})
        }else{
    
    setValues({...values,name:'',photo:'',email:'',password:'',
    loading:false,success:true});
    return <Redirect  to="/signin" />
        }
    
    })
    
    
    };

    const signupform=()=>(<form>
<form className="mb-3" onSubmit={clickSubmit}></form>
        <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control" value={email}/></div>
       
        <div className="form-group">
        <label className="text-muted">name</label>
        <input onChange={handleChange('name')} type="email" className="form-control" value={name}/></div>
        
        <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
        <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>
        
        
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
            );




    return (
        <div>
            {signupform()}
            {showSuccess()}
        </div>
    )
}

export default Signup

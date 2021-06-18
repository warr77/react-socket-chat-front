import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { signin,auth,isauth } from "./user/apiuser";

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const {user}=isauth();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
               auth(data,()=>{
                 setValues({
                    ...values,
                    redirectToReferrer: true
                });


               });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>

            </div>

        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if(user ){
            return <Redirect to="/chatroom" />;
        }
        }
        if(isauth()){return <Redirect to="/" />;}
    };

    return (
       <div>
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
            </div>
    );
};

export default Signin;

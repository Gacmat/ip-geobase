import React from 'react';
import AppContext from "../app.context";
import LoginForm from "../components/Form/LoginForm";

const Login = () => (
    <AppContext.Consumer>
        {(context) => <LoginForm {...context}/>}
    </AppContext.Consumer>
)

export default Login;
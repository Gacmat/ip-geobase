import React from 'react';
import AppContext from "../app.context";
import RegisterForm from "../components/Form/RegisterForm";

const Register = () => (
    <AppContext.Consumer>
        {(context) => <RegisterForm {...context}/> }
    </AppContext.Consumer>
)

export default Register;
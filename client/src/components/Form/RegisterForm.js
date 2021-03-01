import React from 'react';
import {Redirect} from 'react-router';
import {NavLink} from "react-router-dom";
import {FlashTimeouts, GeobaseApi} from "../../app.config";
import axios from 'axios';
import Icons from "../Icons";
import Button from "../Button";
import Input from "../Input";

const styles = {
    wrapper: 'flex justify-center sm:mt-0 md:mt-12',
    dialogBox: 'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:w-96',
    buttonWrapper: 'flex mt-4 items-center justify-between space-x-4',
    registerLink: 'inline-block align-baseline font-bold text-sm text-blue-900 hover:text-blue-300'
}

class RegisterForm extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordRepeat: '',
        registered: false,
        registrationInProgress: false
    }

    handleRegister = (e) => {
        e.preventDefault();
        const {showFlash} = this.props;
        const {firstName, lastName, email, password, passwordRepeat} = this.state;

        if (password && firstName && lastName && email) {
            if (password === passwordRepeat) {
                this.setState({registrationInProgress: true});
                axios.post(GeobaseApi.REGISTER, {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                }).then(res => {
                    showFlash(res.data, 'success',);
                    setTimeout(()=>{this.setState({registered: true})}, FlashTimeouts.TIMEOUT);
                    this.setState({registrationInProgress: false});
                }).catch(err => {
                    if (err.response) {
                        showFlash(`${err.response.statusText} - user already exists, sign in!`, 'error');
                    } else if(err.request) {
                        showFlash(`${err.message}`, 'error');
                    }
                    this.setState({registrationInProgress: false});
                });
            } else {
                showFlash("Passwords are not equal!", 'warning');
            }
        } else {
            showFlash("Complete the form!", 'warning');
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        const {registrationInProgress} = this.state;
        return (

            <div className={styles.wrapper}>
                <form onSubmit={this.handleRegister}className={styles.dialogBox}>
                    <Input onChange={this.handleChange} id="firstName" label="First name"/>
                    <Input onChange={this.handleChange} id="lastName" label="Last name"/>
                    <Input onChange={this.handleChange} id="email" label="E-mail"/>
                    <Input onChange={this.handleChange} id="password" label="Password" placeholder="********"/>
                    <Input onChange={this.handleChange} id="passwordRepeat" type="password" label="Password repeat"
                           placeholder="********"/>
                    <div className={styles.buttonWrapper}>
                        <Button disabled={registrationInProgress} >
                            Register
                            {registrationInProgress && Icons.loading}
                        </Button>
                        <NavLink to="/login" className={styles.registerLink}>If you have an account - sign in</NavLink>
                    </div>
                </form>
                {this.state.registered && <Redirect to={"/login"}/>}
            </div>)
    }
}


export default RegisterForm;
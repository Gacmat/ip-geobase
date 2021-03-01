import React from 'react';
import axios from 'axios';
import Button from "../Button";
import Input from "../Input";
import {FlashTimeouts, GeobaseApi} from "../../app.config";
import Cookies from 'universal-cookie';
import {NavLink} from "react-router-dom";
import {Redirect} from "react-router";
import Icons from "../Icons";

const styles = {
    wrapper: 'flex justify-center sm:mt-0 md:mt-24',
    dialogBox: 'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:w-96',
    buttonWrapper: 'flex mt-4 items-center justify-between space-x-4',
    registerLink: 'inline-block align-baseline font-bold text-sm text-blue-900 hover:text-blue-300'
}

class loginForm extends React.Component {

    state = {
        email: '',
        password: '',
        isLogged: false,
        signingInProgress: false
    }

    handleLogin = (e) => {
        e.preventDefault();
        const {showFlash} = this.props;
        const {email, password} = this.state;
        const cookies = new Cookies();
        if (!email || !password) {
            showFlash('E-mail or password are empty', 'warning');
        } else {
            this.setState({signingInProgress: true});
            axios({
                url: GeobaseApi.LOGIN,
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                data: {...this.state},
                withCredentials: true
            }).then(res => {
                cookies.set('jwt', res.data.token, {path: '/'});
                cookies.set('loggedAt', Date.now(), {path: '/'});
                cookies.set('expiresIn', res.data.expiresIn, {path: '/'});
                cookies.set('loggedUser', res.data.userName, {path: '/'});
                showFlash(`Login successful - welcome ${res.data.userName}`, 'success');
                this.props.refreshHeader();
                this.setState({signingInProgress: false});
                this.setState({isLogged: true});
            }).catch(err => {
                if(err.response){
                    showFlash(`${err.message} - probably wrong email or password`, 'error');
                }else if(err.request) {
                    showFlash(err.message, 'error');
                }
                this.setState({signingInProgress: false});
            })
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        const {signingInProgress, isLogged} = this.state;
        return (
            <>
                <div className={styles.wrapper}>
                    <form onSubmit={this.handleLogin} className={styles.dialogBox}>
                        <Input disabled={isLogged} onChange={this.handleChange} id="email" label="E-mail"/>
                        <Input disabled={isLogged} onChange={this.handleChange} id="password"
                               label="Password" placeholder="********"/>
                        <div className={styles.buttonWrapper}>
                            <Button disabled={isLogged || signingInProgress}>
                                Sign In
                                {signingInProgress && Icons.loading}
                            </Button>
                            <NavLink to={isLogged ? "/" : "/register"} className={styles.registerLink}>Don't
                                have an account?</NavLink>
                        </div>
                    </form>
                    {this.state.isLogged && <Redirect to={"/"}/>}
                </div>
            </>
        )
    }
}

export default loginForm;
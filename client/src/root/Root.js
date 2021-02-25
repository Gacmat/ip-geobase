import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Cookies from 'universal-cookie';
import AppContext from "../app.context";

import {FlashTimeouts} from "../app.config";

import Database from "../views/Database";
import Register from "../views/Register";
import Login from "../views/Login";

import Header from '../components/Header';
import Description from "../views/Description";
import Flash from "../components/Flash";
import Modal from "../components/Form/Modal";
import {Redirect} from "react-router";

const styles = {
    wrapper: 'h-screen bg-blue-100 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-200'
}

class Root extends React.Component {

    state = {
        flashMessage: {
            isFlashShown: false,
            type: '',
            message: ''
        },
        userName: '',
        isLogged: false,
        refresh: false,
    }

    //<editor-fold desc="Description">
    showFlash = (message, type) => {
        this.setState({
            flashMessage: {
                isFlashShown: true,
                type: type,
                message: message
            }
        });
        setTimeout(this.closeFlash, FlashTimeouts.DURATION);
    }

    closeFlash = () => {
        this.setState({
            flashMessage: {
                isFlashShown: false,
            }
        });
    }

    isUserLogged = () => {
        const cookies = new Cookies();
        try {
            if (cookies.get('jwt')) {
                const loggedTime = cookies.get('loggedAt');
                const expiresIn = cookies.get('expiresIn');
                const isExpired = Date.now() - loggedTime > expiresIn * 100;
                return !isExpired;
            }
        }catch(err){
            this.showFlash(err.message, 'error');
        }
        return false;
    }

    getUserNameFromCookie = () =>{
        const cookies = new Cookies();
        try {
            let user = cookies.get('loggedUser');
            if (user) {
                return user.slice(0, user.indexOf('@'));
            }
        } catch(err){
            this.showFlash(err.message, 'error');
        }
        return ''
    }

    logOut = (that) => {
        const cookies = new Cookies();
        try {
            this.setState({});
            let user = cookies.get('loggedUser');
            cookies.remove('loggedUser');
            cookies.remove('jwt');
            cookies.remove('loggedAt');
            cookies.remove('expiresIn');
            user.slice(0, user.indexOf('@'));
            this.showFlash(`Goodbye ${user} - logging out`);
            setTimeout(window.location.reload(), (2*FlashTimeouts.TIMEOUT + FlashTimeouts.DURATION));
        } catch(err){
            this.showFlash(err.message, 'error');
        }
    }

    componentDidMount() {
        this.setState({userName: this.getUserNameFromCookie(), isLogged: this.isUserLogged()})
    }
    //</editor-fold>

    render() {

        const {isFlashShown, type, message} = this.state.flashMessage;

        const flashConfig = {
            indicator: isFlashShown,
            type: type,
            message: message,
            closeFn: this.closeFlash
        }

        const contextElements = {
            showFlash: this.showFlash,
            closeFlash: this.closeFlash,
            isLogged: this.state.isLogged,
            userName: this.state.userName,
        }

        return (
            <BrowserRouter>
                <AppContext.Provider value={contextElements}>
                    <div className={styles.wrapper}>
                        <Header logOut={this.logOut}/>
                        <Flash {...flashConfig}/>
                        <Switch>
                            <Route exact path="/" component={Database}/>
                            <Route path="/description" component={Description}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/login" component={Login}/>
                            {this.state.refresh && <Redirect exact to={"/"}/>}
                        </Switch>
                    </div>

                </AppContext.Provider>
            </BrowserRouter>
        );
    }
}

export default Root;

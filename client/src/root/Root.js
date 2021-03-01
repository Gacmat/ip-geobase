import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppContext from "../app.context";
import {FlashTimeouts} from "../app.config";
import Database from "../views/Database";
import Register from "../views/Register";
import Login from "../views/Login";
import Header from '../components/Header';
import Description from "../views/Description";
import Flash from "../components/Flash";


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
        isHeaderToRefresh: false,
    }

    showFlash = (message, type) => {
        this.setState({
            flashMessage: {
                isFlashShown: true,
                type: type,
                message: message
            }
        });
        setTimeout(() => this.closeFlash(message, type), FlashTimeouts.DURATION);
    }

    closeFlash = (message, type) => {
        this.setState({
            flashMessage: {
                isFlashShown: false,
                type: type,
                message: message
            }
        });
    }

    refreshHeader = () => {
        this.setState({isHeaderToRefresh: true})
    }

    headerRefreshed = () => {
        this.setState({isHeaderToRefresh: false})
    }

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
            refreshHeader: this.refreshHeader,
            headerRefreshed: this.headerRefreshed,
            isHeaderToRefresh: this.state.isHeaderToRefresh
        }

        return (
            <div className={styles.wrapper}>
                <AppContext.Provider value={contextElements}>
                    <BrowserRouter>
                        <Header {...contextElements}/>

                        <Flash {...flashConfig}/>
                        <Switch>
                            <Route exact path="/" component={Database}/>
                            <Route path="/description" component={Description}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/login" component={Login}/>
                        </Switch>
                    </BrowserRouter>
                </AppContext.Provider>
            </div>
        );
    }
}

export default Root;

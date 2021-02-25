import React from 'react';
import Input from "../Input";
import Button from "../Button";
import axios from "axios";
import {FlashTimeouts, GeobaseApi, ipStack} from "../../app.config";
import Cookies from 'universal-cookie';
import AppContext from "../../app.context";
import {NavLink} from "react-router-dom";

const styles = {
    wrapper: 'leading-loose fixed z-10 inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-blue-500',
    overlay: 'fixed inset-0 bg-blue-300 opacity-75',
    center: 'hidden sm:inline-block sm:align-middle md:h-24',
    modal: 'relative z-11 mx-auto max-w-xl p-10 sm:mt-8 md:mt-16 lg:mt-24 2xl:mt-36 bg-white rounded shadow-xl',
    title: 'text-gray-800 font-medium text-xl',
    inputSection: 'space-y-2',
    buttonsSection: 'flex mt-4 justify-between',
}

class Modal extends React.Component {
    //<editor-fold desc="State + methods">
    state = {
        item: {}
    }

    handleChange = (e) => {
        console.log(this.state);
        console.log(e.target.id);
        console.log(this.state[e.target.id])
        e.preventDefault();
        this.setState({[e.target.id] : e.target.value});
    }

    handleAdd = (e) => {
        e.preventDefault();
        const cookies = new Cookies();
        axios.post(GeobaseApi.URI, {...this.state}, {headers: {'Authorization': `Bearer ${cookies.get('jwt')}`}})
            .then(res => {
                this.props.showFlash(res.data.message, 'success');
                setTimeout(this.props.closeModal, FlashTimeouts.TIMEOUT);
                setTimeout(window.location.reload(), 2*FlashTimeouts.TIMEOUT + FlashTimeouts.DURATION);
            }).catch(err => {
            this.props.showFlash(err.message, 'error',);
        })
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const cookies = new Cookies();
        axios.put(GeobaseApi.URI.concat("/", this.state.slug), {...this.state}, {headers: {'Authorization': `Bearer ${cookies.get('jwt')}`}})
            .then(res => {
                this.props.showFlash(res.data.message, 'success');
                setTimeout(window.location.reload(), 2*FlashTimeouts.TIMEOUT + FlashTimeouts.DURATION);
            }).catch(err => {
            this.props.showFlash(err.message, 'error');
        })
        window.location.reload();
    }

    handleDelete = (e) => {
        e.preventDefault();
        const cookies = new Cookies();
        axios.delete(GeobaseApi.URI.concat("/", this.state.slug), {headers: {'Authorization': `Bearer ${cookies.get('jwt')}`}})
            .then(res => {
                this.props.showFlash(res.data.message, 'success');
                setTimeout(window.location.reload(), 2*FlashTimeouts.TIMEOUT + FlashTimeouts.DURATION);
            }).catch(err => {
            this.props.showFlash(err.message, 'error');
        })
    }

    callIpStackForGeoData() {
        if(this.props.ip) {
            axios.get(ipStack.URI.concat('/', this.props.ip, ipStack.ACCESS_KEY)).then(res => {
                this.setState({...res.data});
            }).catch(err => {
                this.props.showFlash(err.message, 'error');
            })
        }else if (this.props.item){
            this.setState({...this.props.item});
        }
        // console.log(ipStack.URI.concat('/', this.props.item.ip, ipStack.ACCESS_KEY));

    }

    componentDidMount() {
        this.callIpStackForGeoData();
        this.setState({...this.props.item});
    }

    //</editor-fold>

    render() {
        let item = this.state;
        const {edit} = this.props;

        return (
            <AppContext.Consumer>
                {/*const contextModalElememts = {
                        item: this.state
                        openModal: this.openModal,
                        closeModal: this.closeModal,
                        handleChange: this.handleChange,
                        showFlash: this.props.showFlash
        }*/}
                {(context) => (
                    <div className={styles.wrapper}>
                        <div className={styles.overlay}/>
                        <div className={styles.modal}>
                            <h1 className={styles.title}>Geolocation data from address: {item.ip}</h1>
                            <div className={styles.inputSection}>
                                <Input onChange={this.handleChange} id="type"
                                       label={`Type:`}>{item.type}</Input>
                                <Input onChange={this.handleChange} id="continent_name"
                                       label={`Continent:`}>{item.continent_name}</Input>
                                <Input onChange={this.handleChange} id="country_name"
                                       label={`Country:`}>{item.country_name}</Input>
                                <Input onChange={this.handleChange} id="region_name"
                                       label={`Region:`}>{item.region_name}</Input>
                                <Input onChange={this.handleChange} id="city"
                                       label={`City:`}>{item.city}</Input>
                                <Input onChange={this.handleChange} id="latitude" type="Number"
                                       label={`Latitude:`}>{item.latitude}</Input>
                                <Input onChange={this.handleChange} id="longitude" type="Number"
                                       label={`Longitude:`}>{item.longitude}</Input>
                            </div>

                            <div className={styles.buttonsSection}>
                                <Button onClick={this.props.closeModal}
                                        styleMode="cancel"/>
                                {context.isLogged ? (
                                    edit ? (
                                            <>
                                                <Button onClick={this.handleDelete}
                                                        disabled={!context.isLogged}
                                                        styleMode="delete"/>

                                                <Button onClick={this.handleUpdate}
                                                        disabled={!context.isLogged}
                                                        styleMode="update"/>
                                            </>)

                                        : (<Button onClick={this.handleAdd} disabled={!context.isLogged}
                                                   styleMode="ok"/>)
                                ) : (<NavLink className={styles.navLink}
                                              activeClassName={styles.navLinkActive}
                                              to="/login">To unblock CRUD actions - <Button>Login</Button>
                                </NavLink>)
                                }
                            </div>
                        </div>
                    </div>
                )}
            </AppContext.Consumer>
        )
    }
}

export default Modal;
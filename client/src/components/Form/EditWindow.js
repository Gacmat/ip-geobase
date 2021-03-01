import React from 'react';
import Input from "../Input";
import Button from "../Button";
import axios from "axios";
import {GeobaseApi, ipStack} from "../../app.config";
import Cookies from 'universal-cookie';
import {NavLink} from "react-router-dom";
import Icons from "../Icons";


const styles = {
    wrapper: 'leading-loose fixed z-10 inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-blue-500',
    overlay: 'fixed inset-0 bg-blue-300 opacity-75',
    center: 'hidden sm:inline-block sm:align-middle md:h-24',
    editWindow: 'relative z-11 mx-auto max-w-xl p-10 sm:mt-8 md:mt-16 lg:mt-24 2xl:mt-36 bg-white rounded shadow-xl',
    title: 'text-gray-800 font-medium text-xl',
    inputSection: 'space-y-2',
    buttonsSection: 'flex mt-4 justify-between',
}

class EditWindow extends React.Component {
    //<editor-fold desc="State + methods">
    state = {
        isLogged: false,
        isWaitingForResponse: false,
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value});
    }

    handleAdd = (e) => {
        e.preventDefault();
        this.waitForResponse();
        const cookies = new Cookies();
        axios.post(GeobaseApi.URI, {...this.state}, {headers: {'Authorization': `Bearer ${cookies.get('jwt')}`}})
            .then(res => {
                this.responseReceived();
                this.props.refreshContent();
                this.props.showFlash(res.data.message, 'success');
                this.props.closeEditWindow();
            }).catch(err => {
            this.responseReceived();
            this.props.showFlash(err.message, 'error',);
        })
    }

    handleUpdate = (e) => {
        e.preventDefault();
        this.waitForResponse();
        const cookies = new Cookies();
        axios.put(GeobaseApi.URI.concat("/", this.state.slug), {...this.state}, {headers: {'Authorization': `Bearer ${cookies.get('jwt')}`}})
            .then(res => {
                this.responseReceived();
                this.props.refreshContent();
                this.props.showFlash(res.data.message, 'success');
                this.props.closeEditWindow();
            }).catch(err => {
            this.responseReceived();
            this.props.showFlash(err.message, 'error');
        })
    }

    handleDelete = (e) => {
        e.preventDefault();
        this.waitForResponse();
        const cookies = new Cookies();
        axios.delete(GeobaseApi.URI.concat("/", this.state.slug), {headers: {'Authorization': `Bearer ${cookies.get('jwt')}`}})
            .then(res => {
                this.responseReceived();
                this.props.refreshContent();
                this.props.showFlash(res.data.message, 'success');
                this.props.closeEditWindow();
            }).catch(err => {
            this.responseReceived();
            this.props.showFlash(err.message, 'error');
        })
    }

    waitForResponse = () => {
        this.setState({isWaitingForResponse: true});
    }

    responseReceived = () => {
        this.setState({isWaitingForResponse: false});
    }

    callIpStackForGeoData() {
        if (this.props.item.ip && !this.props.item['slug']) {
            axios.get(ipStack.URI.concat('/', this.props.item.ip, ipStack.ACCESS_KEY)).then(res => {
                this.setState({...res.data});
            }).catch(err => {
                this.props.showFlash(err.message, 'error');
            })
        } else if (this.props.item) {
            this.setState({...this.props.item});
        }
    }

    componentDidMount() {
        this.callIpStackForGeoData();
        this.setState({...this.props.item});
        const cookies = new Cookies();
        const token = cookies.get('jwt');
        if (token) {
            this.setState({isLogged: true});
        }
    }
    //</editor-fold>

    render() {
        const item = this.state;
        const {isLogged, isWaitingForResponse} = this.state;
        const {addNew} = this.props;

        return (
            <div className={styles.wrapper}>
                <div className={styles.overlay}/>
                <div className={styles.editWindow}>
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
                        <Button onClick={this.props.closeEditWindow}
                                styleMode="cancel"/>
                        {isLogged ? (
                            !addNew ? (
                                    <>
                                        <Button onClick={this.handleDelete}
                                                disabled={!isLogged || isWaitingForResponse}
                                                styleMode="delete"
                                        >
                                            Delete {isWaitingForResponse && Icons.loading}
                                        </Button>

                                        <Button onClick={this.handleUpdate}
                                                disabled={!isLogged || isWaitingForResponse}
                                                styleMode="update"
                                        >
                                            Update {isWaitingForResponse && Icons.loading}
                                        </Button>
                                    </>)

                                : (
                                    <Button onClick={this.handleAdd} disabled={!isLogged || isWaitingForResponse}
                                            styleMode="ok"
                                    >
                                        OK {isWaitingForResponse && Icons.loading}
                                    </Button>
                                )
                        ) : (<NavLink className={styles.navLink}
                                      activeClassName={styles.navLinkActive}
                                      to="/login">To unblock CRUD actions - <Button>Login</Button>
                        </NavLink>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default EditWindow;
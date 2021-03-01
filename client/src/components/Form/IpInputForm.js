import React from 'react';
import {ipStack} from '../../app.config';
import Button from "../Button";
import Input from "../Input";
import axios from 'axios';
import EditWindow from "./EditWindow";
import Icons from "../Icons";


const styles = {
    wrapper: 'inline-block min-w-full  flex flex-col px-2 pt-2 md:pt-8 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40',
    IpInputForm: 'flex inline-block min-w-full space-x-12 items-center',
    userIpInformation: 'justify-center flex mb-4 font-semibold text-xl text-blue-700',
}

class IpInputForm extends React.Component {

    //<editor-fold desc="IpInputForm state and methods">
    state = {
        item: {
            ip: ''
        },
        userIP: '',
        isInputEmpty: true,
    }

    handleSubmit = (e) => {
        const {showFlash} = this.props;
        const {item} = this.state;
        e.preventDefault();
        if (this.state.isInputEmpty) {
            showFlash('Input can\'t be empty', 'warning',);
        } else {
            this.props.openEditWindow(item, true);
        }
    }

    handleChange = (e) => {
        if (e.target.value === '')
            this.setState({isInputEmpty: true});
        else {
            this.setState({isInputEmpty: false});
        }
        this.setState(
            {item:{ip: e.target.value}});
    }

    componentDidMount() {
        axios.get(ipStack.CHECK_IP)
            .then(res => {
                this.setState({userIP: res.data.ip});
            }).catch(err => {
            return err;
        })
    }

    //</editor-fold>

    render() {
        let {userIP} = this.state;

        return (
            <>
                <div className={styles.wrapper}>
                    <h1 className={styles.userIpInformation}>Your IP: {userIP || Icons.loading} </h1>
                    <form onSubmit={this.handleSubmit} className={styles.IpInputForm}>
                        <Input onChange={this.handleChange} id={'ip'} placeholder='Input IP or URL'/>
                        <Button>Create New</Button>
                    </form>
                </div>
            </>
        )
    }
}


export default IpInputForm;
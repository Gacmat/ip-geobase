import React from 'react';
import {ipStack} from '../../app.config';
import Button from "../Button";
import Input from "../Input";
import axios from 'axios';
import Modal from "./Modal";


const styles = {
    wrapper: 'inline-block min-w-full  flex flex-col px-2 pt-2 md:pt-8 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40',
    IpInputForm: 'inline-block min-w-full space-x-12 flex',


    userIpInformation: 'justify-center flex mb-4 font-semibold text-xl text-blue-700',
    form: 'mx-auto flex flex-row rounded py-2 px-4 bg-blue-400',
    selectAll: 'ml-2 select-all'
}

class IpInputForm extends React.Component {

    //<editor-fold desc="IpInputForm state and methods">
    state = {
        ip: '',
        userIP: '',
        isModalOpen: false,
        isInputEmpty: true,
    }

    handleSubmit = (e) => {
        const {showFlash} = this.props;
        e.preventDefault();
        if (this.state.isInputEmpty) {
            showFlash('Input can\'t be empty', 'warning',);
        } else {
            this.openModal(e);
        }
    }

    handleChange = (e) => {
        const {closeFlash} = this.props
        if (e.target.value === '')
            this.setState({isInputEmpty: true});
        else {
            this.setState({isInputEmpty: false});
            closeFlash();
        }
        this.setState({ip: e.target.value});
    }

    openModal = (e) => {
        e.preventDefault();
        this.setState({isModalOpen: true});
    }

    closeModal = () => {
        this.setState({isModalOpen: false});

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

        let {userIP, ip, isModalOpen} = this.state;
        const modalData = {
            ip: this.state.ip,
            closeModal: this.closeModal,
            handleChange: this.handleChange,
            showFlash: this.props.showFlash
        }

        return (
            <>
                <div className={styles.wrapper}>
                    <h1 className={styles.userIpInformation}>Your IP: {userIP || 'loading...'} </h1>
                    <form onSubmit={this.handleSubmit} className={styles.IpInputForm}>
                        <Input onChange={this.handleChange} id={ip} placeholder='Input IP or URL'/>
                        <Button>Create New</Button>
                    </form>
                </div>
                {isModalOpen && <Modal {...modalData}/>}
            </>
        )
    }
}


export default IpInputForm;
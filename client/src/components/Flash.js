import React from 'react';
import PropTypes from 'prop-types';
import {FlashTimeouts} from "../app.config";
import {CSSTransition} from "react-transition-group";


const styles = {
    flashAreaContainer: 'flex absolute  w-full shadow-lg',
    flashArea: 'mx-auto flex w-full',
    default: 'bg-blue-300      flex flex-row h-auto w-full cursor-pointer hover:bg-blue-200',
    success: 'bg-green-300     flex flex-row h-auto w-full cursor-pointer hover:bg-green-200',
    warning: 'bg-yellow-300    flex flex-row h-auto w-full cursor-pointer hover:bg-yellow-200',
    error: 'bg-red-700         flex flex-row h-auto w-full cursor-pointer hover:bg-red-300',
    title: 'py-2 px-8 text-base font-semibold',
    messageWrapper: 'flex flex-row w-full',
    message: 'flex whitespace-nowrap w-full space-x-reverse bg-blue-100 transparent text-black p-2 justify-between ',
    click: 'bg-blue-100 whitespace-nowrap h-full m-auto p-2'
}


const Flash = ({indicator, type, closeFn, message}) => {

    const title = type === 'default' ? "Message" : type.charAt(0).toUpperCase().concat(type.substring(1));

    return (
        <CSSTransition in={indicator} timeout={FlashTimeouts.TIMEOUT} classNames="display" unmountOnExit>
            <div className={styles.flashAreaContainer}>
                <div className={styles.flashArea}>
                    <div onClick={() => closeFn(message, type)} className={styles[type]}>
                        <div className={styles.messageWrapper}>
                            <h1 className={styles.title}>{title}</h1>
                            <div className={styles.message}>
                                <span>{message}</span>
                            </div>
                        </div>
                        <span className={styles.click}>Click to hide</span>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

Flash.propTypes = {
    type: PropTypes.string,
    indicator: PropTypes.bool.isRequired,
    closeFn: PropTypes.func.isRequired,
    message: PropTypes.string
}

Flash.defaultProps = {
    type: 'default',
    message: ''
}

export default Flash;
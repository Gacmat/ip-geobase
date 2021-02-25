import React from 'react';
import PropTypes from 'prop-types';
import {FlashTimeouts} from "../app.config";
import {CSSTransition} from "react-transition-group";


const styles = {
    flashAreaContainer: 'flex absolute z-50 w-full h-0',
    flashArea: 'mt-4 mx-auto bg-black',
    default: 'bg-blue-300 border border-blue-300 rounded-xl w-80 shadow-xl',
    success: 'bg-green-300 border border-green-500 rounded-xl w-80 shadow-xl',
    warning: 'bg-yellow-300 border-2 border-yellow-300 rounded-xl w-80 shadow-xl',
    error: 'bg-red-700 border border-red-700 rounded-xl w-80 shadow-xl',
    message: 'flex bg-white text-black rounded-b-xl text-xl h-28 p-2',
    title: 'ml-2 py-1 text-2xl',
}


const Flash = ({indicator, type, closeFn, message}) => {

    const title = type === 'default' ? "Message" : type.charAt(0).toUpperCase().concat(type.substring(1));

    return (
        <CSSTransition in={indicator} timeout={FlashTimeouts.TIMEOUT} classNames="display" unmountOnExit>
            <div className={styles.flashAreaContainer}>
                <div className={styles.flashArea}>
                    <div onMouseLeave={closeFn} onClick={closeFn} className={styles[type]}>
                        <h1 className={styles.title}>{title}</h1>
                        <div className={styles.message}>
                            <span>{message}</span>
                        </div>
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
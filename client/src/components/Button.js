import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    default: 'bg-blue-300 hover:bg-blue-400 active:bg-blue-500          disabled:opacity-50 transition duration-200 ease-in-out inline-flex items-center focus:outline-none border-0 rounded py-1 px-3 mt-4 md:mt-0 text-black text-base font-semibold cursor-pointer',
    ok: 'bg-green-200 hover:bg-green-300 active:bg-green-400            disabled:opacity-50 transition duration-200 ease-in-out inline-flex items-center focus:outline-none border-0 rounded py-1 px-3 mt-4 md:mt-0 text-black text-base font-semibold cursor-pointer',
    delete: 'bg-red-200 hover:bg-red-300 active:bg-red-400              disabled:opacity-50 transition duration-200 ease-in-out inline-flex items-center focus:outline-none border-0 rounded py-1 px-3 mt-4 md:mt-0 text-black text-base font-semibold cursor-pointer',
    update: 'bg-yellow-200 hover:bg-yellow-300 active:bg-yellow-400     disabled:opacity-50 transition duration-200 ease-in-out inline-flex items-center focus:outline-none border-0 rounded py-1 px-3 mt-4 md:mt-0 text-black text-base font-semibold cursor-pointer',
    cancel: 'bg-blue-100 hover:bg-blue-200 active:bg-blue-300           disabled:opacity-50 transition duration-200 ease-in-out inline-flex items-center focus:outline-none border-0 rounded py-1 px-3 mt-4 md:mt-0 text-black text-base font-semibold cursor-pointer'
}

const Button = ({styleMode, disabled, onClick, children}) => {
    const className = styles[styleMode] || styles.default;
    const name =    styleMode
        ? (children !== Button.defaultProps.children
            ? children
            : styleMode.charAt(0).toUpperCase().concat(styleMode.substring(1)))
        : children;

    return (
        onClick
            ? <button className={className} type="button" disabled={disabled} onClick={onClick}>{name}</button>
            : <input className={className} type="submit" disabled={disabled} value={name}/>
    )
}

Button.propTypes = {
    styleMode: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.string
}

Button.defaultProps = {
    styleMode: '',
    disabled: false,
    onClick: null,
    children: 'OK'
}

export default Button;
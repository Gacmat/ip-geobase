import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    input: 'disabled:opacity-50 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker focus:outline-none focus:border focus:border-blue-300 ',
    label: 'block text-grey-darker text-sm font-semibold',
    search: 'appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none',
    searchIcon: 'h-full absolute inset-y-0 left-0 flex items-center pl-2',
    searchWrapper: 'block relative'
}

const Input = ({id, onChange, type, styleMode, placeholder, children, disabled, label, icon}) => {
    const className = styles[styleMode];
    const automaticType = (id === "email" || id === "password") ? id : type;
    const automaticPlaceholder = label && !placeholder ? label : placeholder;
    const input = <input id={id} onChange={onChange}
                         type={automaticType}
                         className={className}
                         placeholder={automaticPlaceholder}
                         defaultValue={children}
                         disabled={disabled}
                         autoComplete="off"/>
    return (label ? (
            <div>
                <label htmlFor={id} className={styles.label}>
                    {(label === true ? id : label)}
                </label>
                {input}
            </div>
        ) : icon
            ? (
                <div className={styles.searchWrapper }>
                    <label htmlFor={id} className={styles.searchIcon}>
                        {icon}
                    </label>
                    {input}
                </div>
            )
            : input
    )
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    styleMode: PropTypes.string,
    placeholder: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    label: PropTypes.string,
}

Input.defaultProps = {
    type: 'text',
    styleMode: 'input',
    placeholder: '',
    children: '',
    disabled: false,
    label: '',
}

export default Input;
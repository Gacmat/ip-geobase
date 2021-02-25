import React from 'react';
import PropTypes from 'prop-types';
import Icons from './Icons';
import TagList from "./TagList";

const styles = {
    icon: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700',
    select: 'appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
    selectWrapper: 'relative',
}

const Select = ({id, items, onChange}) => {
    return (
        <div className={styles.selectWrapper}>
            <select id={id} onChange={onChange}
                className={styles.select}>
                <TagList Tag={"option"} items={items}/>
            </select>
            <div className={styles.icon}>{Icons.arrowDown}</div>
    </div>
    )
}


export default Select;
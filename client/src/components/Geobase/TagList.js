import React from 'react';
import PropTypes from 'prop-types';

const TagList = ({items, Tag, className, onClick}) => {
    return (
        items.map(item => (
            <Tag id={Tag!== 'options' && item} className={className} onClick={onClick}>{item}</Tag>
        ))
    )
}

TagList.propTypes = {
    Tag: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
}
export default TagList;
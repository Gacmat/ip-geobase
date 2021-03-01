import React from 'react';
import Row from "./Row";

const TableData = ({items}) => {
    return (
        <tbody>
        {items.map(item => (
            <Row key={item._id} item={item}/>
        ))}
        </tbody>
    )
}


export default TableData;
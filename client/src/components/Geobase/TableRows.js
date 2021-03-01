import React from 'react';
import Row from "./Row";

const styles = {
    name: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
}

const TableRows = ({items, onClick}) => (
    <tbody>
    {items.map(item => (
        <tr onClick={onClick}>
            <Row item={item}/>
        </tr>
    ))}
    </tbody>
)

export default TableRows;
import React from 'react';
import Row from "./Row";

const blankItem = {
    slug: '-',
    ip: '-',
    type: '-',
    continent_name: '-',
    country_name: '-',
    region_name: '-',
    city: '-',
    latitude: '-',
    longitude: '-',
    createdAt: '-',
    updatedAt: '-'
}

const TableData = ({items}) => {
    return (
        <tbody>
        {
            items.length !== 0
                ? items.map(item => (<Row key={item._id} item={item}/>))
                : <Row blank item={blankItem}/>
        }
        </tbody>
    )
}


export default TableData;
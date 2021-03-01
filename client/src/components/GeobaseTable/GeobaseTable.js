import React from 'react';
import TableHeader from "./TableHeader";
import TableData from "./TableData";
import EditWindow from "../Form/EditWindow";

const styles = {
    wrapperPositioning: '-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-200',
    wrapper: 'inline-block min-w-full shadow rounded-lg overflow-hidden',
    table: 'min-w-full leading-normal'
}

const GeobaseTable = ({filters, items, handleSort}) => {

    return (
        <div className={styles.wrapperPositioning}>
            <div className={styles.wrapper}>
                <table className={styles.table}>
                    <TableHeader items={filters} onClick={handleSort}/>
                    <TableData items={items}/>
                </table>
            </div>

        </div>

    )
}

export default GeobaseTable;
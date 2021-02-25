import React from 'react';
import Cell from "./Cell";
import AppContext from "../../app.context";

const styles = {
    tr: 'bg-white hover:bg-blue-100 cursor-pointer',

}

const Row = ({item}) => (
    <AppContext.Consumer>
            {/*const contextModalElememts = {
                    ip: this.state.ip,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    handleChange: this.handleChange,
                    showFlash: this.props.showFlash
        }*/}
            {(context)=>(
                <tr className={styles.tr} onClick={()=>{context.openModal(item)}}>
                        <Cell>{item.slug}</Cell>
                        <Cell>{item.ip}</Cell>
                        <Cell>{item.type}</Cell>
                        <Cell>{item.continent_name}</Cell>
                        <Cell>{item.country_name}</Cell>
                        <Cell>{item.region_name}</Cell>
                        <Cell>{item.city}</Cell>
                        <Cell>{item.latitude}</Cell>
                        <Cell>{item.longitude}</Cell>
                        <Cell>{item.createdAt}</Cell>
                        <Cell>{item.updatedAt}</Cell>
                </tr>
            )}
    </AppContext.Consumer>


)


export default Row;
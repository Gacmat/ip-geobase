import React from 'react';
import AppContext from "../app.context";
import GeobaseWrapper from "../components/GeobaseTable/GeobaseWrapper";

const Database = () => (
    <AppContext.Consumer>
        {(context) => <GeobaseWrapper {...context}/>}
    </AppContext.Consumer>
);

export default Database;
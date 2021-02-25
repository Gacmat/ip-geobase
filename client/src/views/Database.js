import React from 'react';
import AppContext from "../app.context";
import GeobaseWrapper from "../components/GeobaseTable/GeobaseWrapper";
import IpInputForm from "../components/Form/IpInputForm";


const Database = () => (
        <AppContext.Consumer>
            {(context) =>
                <>
                    <IpInputForm {...context}/>
                    <GeobaseWrapper {...context}/>
                </>
            }
        </AppContext.Consumer>
);

export default Database;
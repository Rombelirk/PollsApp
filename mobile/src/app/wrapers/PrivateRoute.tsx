import React, { useState } from 'react';
import {
    Route,
    Redirect,
} from "react-router-native";
import { retrieveData } from '../helpers/asyncStorage'

function PrivateRoute({ component: Component, ...rest }) {
    const [jwtToken, setJwtToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    retrieveData("jwtToken").then(res => {

        console.log(res, "res")
        if (res) {
            setJwtToken(res)
        }
        setLoading(false)
    })

    if (loading) {
        return null;
    }

    if (!jwtToken) {
        console.log("!jwtToken", jwtToken)
        return <Redirect to="/auth" />
    }

    return (
        <Route
            {...rest}
            render={props => <Component {...props} />}
        />
    );
}

export default PrivateRoute;
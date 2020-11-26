import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IsLogin } from "../utility";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (IsLogin() && restricted ? <Redirect to="/home" /> : <Component {...props} />)}
        />
    );
};

export default PublicRoute;

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";
import Register from "../views/register";
import Login from "../views/login";
import Home from "../views/home";
import Logout from "../views/logout";
import PdfFiles from '../views/pdfFiles'

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>
                <Route exact path="/register" component={Register} />
                <Route exact path="/logout" component={Logout} />
                <PublicRoute exact path="/login" component={Login} restricted={true} />
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/pdf-files" component={PdfFiles} />
            </Switch>
        </div>
    );
};

import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/user.context";

export default function Logout() {
    const history = useHistory();

    const { authDispatch } = useContext(UserContext);
    useEffect(() => {
        authDispatch({
            type: "SIGNOUT",
        });
        localStorage.removeItem("jwtToken");
        history.push("/login");
    }, []);
    return <div></div>;
}

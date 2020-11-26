import React, { useEffect, useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { userService } from "../services";
import MainLayout from "../component/mainLayout";
import { Descriptions } from "antd";

export default function Home() {
    const {
        authState: { user },
        authDispatch,
    } = useContext(UserContext);
    useEffect(() => {
        userService()
            .userDetails()
            .then((res) => {
                authDispatch({
                    type: "USER_DETAILS",
                    payload: res.data.data,
                });
            });
    }, []);
    return (
        <MainLayout navKey="1">
            {user.length ? <Descriptions title="User Info" column={1}>
                <Descriptions.Item label="Username">{user[0].username}</Descriptions.Item>
                <Descriptions.Item label="Email">{user[0].email}</Descriptions.Item>
            </Descriptions> : null}
        </MainLayout>
    );
}

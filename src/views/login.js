import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { authService } from "../services";
import { UserContext } from "../contexts/user.context";

export default function Login() {
    const history = useHistory();

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { authDispatch } = useContext(UserContext);

    const onFinish = (values) => {
        authService()
            .loginUser({ email: values.email, password: values.password }, "post")
            .then((res) => {
                authDispatch({
                    type: "SIGNIN",
                    payload: res.data.token,
                });
                localStorage.setItem("jwtToken", res.data.token);
                history.push("/home");
            })
            .catch((err) => {
                if (typeof err.response.data.message !== "undefined") {
                    setErrorMessage(err.response.data.message);
                    setIsError(true);
                }
                setErrorMessage("Something Went Wrong");
                setIsError(true);
            });
    };

    if (isError) {
        setTimeout(function () {
            setIsError(false);
        }, 3000);
    }

    return (
        <Row align="middle" style={{ minHeight: "calc(100vh - 134px)" }}>
            <Col span={8} offset={8} style={{ textAlign: "center" }}>
                <Card>
                    <h1>Login</h1>
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                        <Form.Item name="email" rules={[{ required: true, message: "Please input your email id!" }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                width="600px"
                            />
                        </Form.Item>
                        {isError ? (
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <h5 style={{ color: "red", fontSize: "13px" }}>{errorMessage}</h5>
                            </div>
                        ) : (
                            ""
                        )}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{ width: "100%" }}
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    If you are not registered please <a href="/register">Register</a>
                </Card>
            </Col>
        </Row>
    );
}

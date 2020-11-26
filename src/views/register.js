import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined, ContactsOutlined } from "@ant-design/icons";
import { authService } from "../services";

export default function Register() {
    const history = useHistory();

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onFinish = (values) => {
        if (values.username.length < 4) {
            setErrorMessage("username must contain atleast 4 characters");
            setIsError(true);
            return;
        }
        if (values.password.length < 6) {
            setErrorMessage("password must contain atleast 6 characters");
            setIsError(true);
            return;
        }
        if (values.password !== values.confirm_password) {
            setErrorMessage("passwords doesn't match");
            setIsError(true);
            return;
        }
        authService()
            .registerUser({ username: values.username, email: values.email, password: values.password }, "post")
            .then((res) => {
                message.success("Registered Successfully");
                history.push("/login");
            })
            .catch((err) => {
                if (typeof err.response.data.message !== "undefined") {
                    setErrorMessage(err.response.data.message);
                    setIsError(true);
                }
            });
    };

    if (isError) {
        setTimeout(function () {
            setIsError(false);
        }, 3000);
    }

    return (
        <div>
            <Row align="middle" style={{ minHeight: "calc(100vh - 134px)" }}>
                <Col span={8} offset={8} style={{ textAlign: "center" }}>
                    <Card>
                        <h1>Register</h1>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item name="username" rules={[{ required: true, message: "Please input your username" }]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
                            </Form.Item>
                            <Form.Item name="email" rules={[{ required: true, message: "Please input your email id!" }]}>
                                <Input prefix={<ContactsOutlined className="site-form-item-icon" />} placeholder="email" />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    width="600px"
                                />
                            </Form.Item>
                            <Form.Item
                                name="confirm_password"
                                rules={[{ required: true, message: "Please confirm your Password!" }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Confirm Password"
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
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                        If you are already registered please <a href="/login">Login</a>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

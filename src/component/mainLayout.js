import React from "react";
import { Layout, Menu } from "antd";
import { UploadOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "./main.css";

export default function MainLayout(props) {
    const { Header, Content, Footer, Sider } = Layout;
    return (
        <div>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo" />
                    <br />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={props.navKey}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <a href="/home">Profile</a>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UploadOutlined />}>
                            <a href="/pdf-files">PDF files</a>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<LogoutOutlined />}>
                            <a href="/logout">Logout</a>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    <Content style={{ margin: "24px 16px 0" }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 800 }}>
                            {props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>Coding Test</Footer>
                </Layout>
            </Layout>
        </div>
    );
}

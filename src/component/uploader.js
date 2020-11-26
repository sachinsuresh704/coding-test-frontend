import React, { useState, useContext } from "react";
import { Modal, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { UserContext } from "../contexts/user.context";

export default function Uploader(props) {
    const [visible, setVisible] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { authDispatch } = useContext(UserContext);
    const token = localStorage.getItem("jwtToken");
    const IMAGE_UPLOAD_URL = process.env.REACT_APP_BACKEND_PORT + "/users/upload";

    const handleModal = () => {
        setVisible(true);
    };

    const handleOk = (e) => {
        let data = document.getElementsByName("uploader");

        if (data[0].files.length === 0) {
            setErrorMessage("Please Select A File");
            setIsError(true);
            return;
        }
        if (data[0].files[0].type !== "application/pdf") {
            setErrorMessage("Please Select A PDF File");
            setIsError(true);
            return;
        }
        const formData = new FormData();
        formData.append("pdf", data[0].files[0]);
        axios
            .post(IMAGE_UPLOAD_URL, formData, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Access-Control-Allow-Origin": "*",
                    authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                authDispatch({
                    type: "ADD_TO_FILES",
                    payload: response.data.data,
                });
                setVisible(false);
            })
            .catch((err) => {
                setErrorMessage("Please Try Again");
                setIsError(true);
            });
    };

    const handleCancel = (e) => {
        setVisible(false);
    };

    if (isError) {
        setTimeout(function () {
            setIsError(false);
        }, 3000);
    }

    return (
        <div>
            <Button type="primary" onClick={handleModal}>
                <UploadOutlined />
                Add New
            </Button>
            <Modal title="Upload PDF" visible={visible} onOk={handleOk} onCancel={handleCancel} okText="Upload">
                <input name="uploader" type="file" />
                {isError ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h5 style={{ color: "red", fontSize: "13px" }}>{errorMessage}</h5>
                    </div>
                ) : (
                    ""
                )}
            </Modal>
        </div>
    );
}

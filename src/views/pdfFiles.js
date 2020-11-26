import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../component/mainLayout";
import Table from "../component/table";
import { UserContext } from "../contexts/user.context";
import userService from "../services/user.service";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Uploader from "../component/uploader";

export default function PdfFiles() {
    const {
        authState: { files, filteredData },
        authDispatch,
    } = useContext(UserContext);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        userService()
            .listFiles()
            .then((res) => {
                authDispatch({
                    type: "LIST_FILES",
                    payload: res.data.data,
                });
            });
    }, []);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
        authDispatch({
            type: "FILTER_FILES",
            payload: e.target.value,
        });
    };

    const columns = [
        {
            name: <h5 style={{ fontSize: "15px", fontWeight: "bold" }}>File Name</h5>,
            selector: "title",
            sortable: true,
            width: "250px",
            cell: (row) => (
                <p title={row.fileName} className="text-truncate text-bold-500 mb-0">
                    {row.fileName}
                </p>
            ),
        },
        {
            name: <h5 style={{ fontSize: "15px", fontWeight: "bold" }}>Download</h5>,
            selector: "title",
            sortable: true,
            width: "250px",
            cell: (row) => (
                <Button href={row.url} download>
                    <DownloadOutlined />
                </Button>
            ),
        },
    ];

    return (
        <MainLayout navKey="2">
            <Uploader />
            <br />
            <input type="text" onChange={handleInputChange} placeholder="Search Your Files" />
            <br />
            <Table columns={columns} data={searchValue === "" ? files : filteredData} />
        </MainLayout>
    );
}

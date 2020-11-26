import React from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody } from "reactstrap";

export default function Table(props) {
    return (
        <div>
            <Card>
                <CardBody>
                    <DataTable
                        responsive
                        data={props.data}
                        columns={props.columns}
                        noHeader
                        style={{ textTransform: "uppercase" }}
                    />
                </CardBody>
            </Card>
        </div>
    );
}

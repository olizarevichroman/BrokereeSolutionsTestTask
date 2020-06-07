import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Button, Space, Popconfirm } from "antd";
import rx from "./../shared/rx";

const dataSource = [];
for (let i = 0; i < 20; i++) {
    dataSource.push({
        key: "my great key",
        value: "my great value",
    });
}

dataSource.push({
    key: "last",
    value: "last",
});

export default class ItemsList extends Component {
    static propsTypes = {
        onResourceDelete: PropTypes.func.isRequired,
    };

    static defaulProps = {
        loading: false,
    };

    constructor(props) {
        super(props);

        this.columnsConfig = [
            {
                title: "Key",
                dataIndex: "key",
                key: "key",
            },
            {
                title: "Value",
                dataIndex: "value",
                key: "value",
            },
            {
                title: "Actions",
                render: (item) => {
                    return (
                        <Space>
                            <Button>save</Button>
                            <Popconfirm
                                title="Are you sure delete this resource?"
                                onConfirm={() =>
                                    props.onResourceDelete(item.key)
                                }
                            >
                                <Button danger>delete</Button>
                            </Popconfirm>
                        </Space>
                    );
                },
                key: "action",
            },
        ];
    }

    render() {
        const { items, loading } = this.props;

        return (
            <div>
                <Table
                    loading={loading}
                    columns={this.columnsConfig}
                    pagination={{
                        pageSize: 5,
                        onChange: () => console.log("page was changed"),
                    }}
                    dataSource={items}
                />
            </div>
        );
    }
}

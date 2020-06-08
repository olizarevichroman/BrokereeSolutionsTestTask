import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Space, Popconfirm } from 'antd';

export default class ItemsList extends Component {
    static propsTypes = {
        onResourceDelete: PropTypes.func.isRequired
    };

    static defaulProps = {
        loading: false
    };

    constructor(props) {
        super(props);

        this.columnsConfig = [
            {
                title: 'Key',
                dataIndex: 'key',
                key: 'key',
                width: '40%'
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                width: '40%'
            },
            {
                title: 'Actions',
                render: (item) => {
                    return (
                        <Space className="resource-table__actions-container">
                            <Button className="resource-table__action">
                                save
                            </Button>
                            <Popconfirm
                                title="Are you sure delete this resource?"
                                onConfirm={() =>
                                    props.onResourceDelete(item.key)
                                }
                            >
                                <Button
                                    className="resource-table__action"
                                    danger
                                >
                                    delete
                                </Button>
                            </Popconfirm>
                        </Space>
                    );
                },
                key: 'action',
                width: '20%'
            }
        ];
    }

    render() {
        const { items, loading } = this.props;

        return (
            <div className="resource-table">
                <Table
                    loading={loading}
                    columns={this.columnsConfig}
                    pagination={{
                        pageSize: 5,
                        onChange: () => console.log('page was changed')
                    }}
                    dataSource={items}
                />
            </div>
        );
    }
}

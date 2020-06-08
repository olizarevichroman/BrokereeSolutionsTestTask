import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Space, Popconfirm, Form } from 'antd';
import EditableCell from './editableCell';

export default class ItemsList extends Component {
    static propsTypes = {
        onResourceDelete: PropTypes.func.isRequired
    };

    static defaulProps = {
        loading: false
    };

    constructor(props) {
        super(props);

        this.state = {
            editingKey: false,
            formRef: React.createRef()
        };

        this.components = {
            body: {
                cell: EditableCell
            }
        };

        this.columnsConfig = [
            {
                title: 'Key',
                dataIndex: 'key',
                key: 'key',
                width: '40%',
                editable: true
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                width: '40%',
                editable: true
            },
            {
                title: 'Actions',
                render: (item) => {
                    return (
                        <Space className="resource-table__actions-container">
                            {this.isEditing(item.key) ? (
                                <React.Fragment>
                                    <Button
                                        htmlType="submit"
                                        className="resource-table__action"
                                    >
                                        save
                                    </Button>
                                    <Button
                                        className="resource-table__action"
                                        htmlType="button"
                                        onClick={() => this.onEditingKeyChanged(false)}
                                    >
                                        cancel
                                    </Button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Button
                                        htmlType="button"
                                        className="resource-table__action"
                                        onClick={() =>
                                            this.onEditingKeyChanged(item)
                                        }
                                    >
                                        edit
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
                                </React.Fragment>
                            )}
                        </Space>
                    );
                },
                key: 'action',
                width: '20%'
            }
        ];
    }

    onEditingKeyChanged = (record) => {
        const { formRef } = this.state;
        formRef.current.setFieldsValue({ ...record });
        this.setState({
            editingKey: record.key
        });
    };

    isEditing = (key) => {
        return this.state.editingKey === key;
    };

    updateResource = (record) => {
        console.log('record', record);
    };

    render() {
        const { items, loading, onSave } = this.props;
        const { components, columnsConfig, state } = this;
        const { editingKey, formRef } = state;

        const columns = columnsConfig.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record.key)
                })
            };
        });

        return (
            <div className="resource-table">
                <Form onFinish={this.updateResource} ref={formRef}>
                    <Table
                        rowClassName="resource-table__row"
                        loading={loading}
                        components={components}
                        columns={columns}
                        pagination={{
                            pageSize: 5,
                            onChange: () => console.log('page was changed')
                        }}
                        dataSource={items}
                    />
                </Form>
            </div>
        );
    }
}

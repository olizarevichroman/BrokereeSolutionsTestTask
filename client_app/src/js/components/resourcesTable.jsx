import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Space, Popconfirm, Form } from 'antd';
import EditableCell from './editableCell';

export default class ResourcesTable extends Component {
    static propsTypes = {
        onResourceDelete: PropTypes.func.isRequired
    };

    static defaulProps = {
        loading: false
    };

    constructor(props) {
        super(props);

        this.state = {
            editingItemInvalid: false,
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
                width: '40%'
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
                                        htmlType="button"
                                        className="resource-table__action"
                                        onClick={() => this.updateResource(item.key)}
                                        disabled={this.isItemInvalid()}
                                        loading={this.isItemUpdating()}
                                    >
                                        save
                                    </Button>
                                    <Button
                                        className="resource-table__action"
                                        htmlType="button"
                                        disabled={this.isItemUpdating()}
                                        onClick={() =>
                                            this.onResourceEdit(false)
                                        }
                                    >
                                        cancel
                                    </Button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Button
                                        htmlType="button"
                                        className="resource-table__action"
                                        disabled={this.isItemUpdating()}
                                        onClick={() =>
                                            this.onResourceEdit(item)
                                        }
                                    >
                                        edit
                                    </Button>
                                    <Popconfirm
                                        title="Are you sure delete this resource?"
                                        onConfirm={() =>
                                            props.onResourceDelete(item)
                                        }
                                    >
                                        <Button
                                            className="resource-table__action"
                                            htmlType="button"
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

    onResourceEdit = (record) => {
        const { formRef } = this.state;
        formRef.current.setFieldsValue({ ...record });
        this.props.onResourceEdit(record.key);
    }

    updateResource = async (key) => {
        const { onResourceUpdate } = this.props;
        const { current: form } = this.state.formRef;
        try {
            const row = await form.validateFields();
            onResourceUpdate({ key, value: row.value });
        }
        catch(error) {
            console.log('Error', error);
        }
    };

    isItemUpdating = () => {
        return this.props.editingItem.updating;
    };

    isEditing = (key) => {
        return this.props.editingItem.key === key;
    };

    isItemInvalid = () => {
        return this.state.editingItemInvalid;
    }

    onFieldsChange = (changedFields, allFields) => {
        const isEditingItemInvalid = allFields.some(f => f.errors.length > 0);
        const currentItemState = this.state.isEditingItemInvalid;

        if (isEditingItemInvalid != currentItemState) {
            this.setState({
                editingItemInvalid: isEditingItemInvalid
            });
        }
    }

    render() {
        const { items, loading } = this.props;
        const { components, columnsConfig, state } = this;
        const { formRef } = state;

        const columns = columnsConfig.map((col) => {
            if (col.editable) {
                return {
                    ...col,
                    onCell: (record) => ({
                        record,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: this.isEditing(record.key)
                    })
                };
            }

            return col;
        });

        return (
            <div className="resource-table" >
                <Form ref={formRef} onFieldsChange={this.onFieldsChange}>
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

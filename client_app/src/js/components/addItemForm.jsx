import React, { Component } from 'react';
import { Form, Button, Input, Alert, Space } from 'antd';

export default class AddItemForm extends Component {
    render() {
        const { onValidSubmit, isLoading, errorMessage } = this.props;
        return (
            <div className="resource-form">
                <Space
                    direction="vertical"
                    className="resource-form__space"
                    size="middle"
                >
                    {errorMessage && (
                        <Alert
                            message="Error"
                            description={errorMessage}
                            type="error"
                            showIcon
                            closable
                        />
                    )}
                    <Form onFinish={onValidSubmit}>
                        <Form.Item
                            name="key"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input resource key'
                                }
                            ]}
                        >
                            <Input
                                placeholder="Resource Key"
                                id="resourceKey"
                                disabled={isLoading}
                            />
                        </Form.Item>
                        <Form.Item
                            name="value"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input resource value'
                                }
                            ]}
                        >
                            <Input
                                placeholder="Resource Value"
                                disabled={isLoading}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                                loading={isLoading}
                            >
                                Add item
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </div>
        );
    }
}

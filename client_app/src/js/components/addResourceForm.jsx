import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Alert, Space } from 'antd';

export default class AddResourceForm extends React.Component {
    static propTypes = {
        onValidSubmit: PropTypes.func.isRequired,
        onErrorClosed: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        errorMessage: PropTypes.node
    };
    constructor(props) {
        super(props);

        this.state = {
            isSubmitDisabled: true
        };
    }

    onFieldsChanged = (changedFields, allFields) => {
        const isSubmitDisabled = allFields.some(
            (f) => !f.touched || f.errors.length > 0
        );

        if (this.state.isSubmitDisabled !== isSubmitDisabled) {
            this.setState({
                isSubmitDisabled
            });
        }
    };

    render() {
        const {
            onValidSubmit,
            isLoading,
            errorMessage,
            onErrorClosed
        } = this.props;
        const { isSubmitDisabled } = this.state;

        return (
            <div className="resource-form">
                <Space
                    direction="vertical"
                    className="resource-form__space"
                    size="middle"
                >
                    <Form
                        onFinish={onValidSubmit}
                        onFieldsChange={this.onFieldsChanged}
                    >
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
                                    onClose={onErrorClosed}
                                    showIcon
                                    closable
                                />
                            )}
                            <Form.Item
                                name="key"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input resource key'
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input
                                    placeholder="Resource Key"
                                    id="resourceKey"
                                    disabled={isLoading}
                                />
                            </Form.Item>
                        </Space>
                        <Form.Item
                            name="value"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input resource value'
                                }
                            ]}
                            hasFeedback
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
                                disabled={isSubmitDisabled}
                            >
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </div>
        );
    }
}

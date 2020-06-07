import React, { Component } from "react";
import { Form, Button, Input } from "antd";

export default class AddItemForm extends Component {
  render() {
    const { onValidSubmit, isLoading } = this.props;
    return (
      <div className="resource-form">
        <Form onFinish={onValidSubmit}>
          <Form.Item
            name="key"
            rules={[
              {
                required: true,
                message: "Please input resource key",
              },
            ]}
          >
            <Input placeholder="Resource Key" id="resourceKey" disabled={isLoading}/>
          </Form.Item>
          <Form.Item name="value">
            <Input placeholder="Resource Value" disabled={isLoading}/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Add item
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

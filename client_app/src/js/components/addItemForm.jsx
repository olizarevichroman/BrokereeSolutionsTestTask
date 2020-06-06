import React, { Component } from "react";
import { Form, Button, Input } from "antd";

export default class AddItemForm extends Component {
  onFinish = (model) => {
    console.log(model);
  };

  render() {
    return (
      <div className="resource-form">
        <Form onFinish={this.onFinish}>
          <Form.Item
            name="key"
            rules={[
              {
                required: true,
                message: "Please input resource key",
              },
            ]}
          >
            <Input placeholder="Resource Key" id="resourceKey" />
          </Form.Item>
          <Form.Item name="value">
            <Input placeholder="Resource Value"/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Add item
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

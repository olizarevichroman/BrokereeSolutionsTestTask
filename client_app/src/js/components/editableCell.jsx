import React, { Component } from 'react';
import { Form, Input } from 'antd';

export default class EditableCell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            inputRef: React.createRef()
        };
    }

    render() {
        const {
            title,
            dataIndex,
            editable,
            children,
            record,
            editing,
            ...restProps
        } = this.props;

        return (
            <td {...restProps} className="editable-cell">
                {editing ? (
                    <Form.Item
                        className="editable-cell__input"
                        name={dataIndex}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    }
}

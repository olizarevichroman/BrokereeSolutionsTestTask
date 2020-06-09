import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

export default class EditableCell extends React.Component {
    static propTypes = {
        editing: PropTypes.bool,
        title: PropTypes.string

    }
    constructor(props) {
        super(props);

        this.state = {
            inputRef: React.createRef()
        };
    }

    render() {
        const {
            title,
            dataIndex,
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
                                message: `${title} is required`
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

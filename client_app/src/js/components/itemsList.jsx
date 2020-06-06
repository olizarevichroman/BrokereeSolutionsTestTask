import React, { Component } from "react";
import { List, Button } from "antd";

const dataSource = [];
for (let i = 0; i < 20; i++) {
  dataSource.push({
    key: "my great key",
    value: "my great value",
  });
}

dataSource.push({
    key: "last",
    value: "last"
});

export default class ItemsList extends Component {
  renderItem = (item) => {
    return (
      <List.Item actions={[<Button>edit</Button>, <Button danger>delete</Button>]}>{item.value}</List.Item>
    );
  };
  render() {
    return (
      <div>
        <List
          pagination={{
              pageSize: 5,
              onChange: () => console.log("page was changed")
          }}
          dataSource={dataSource}
          renderItem={this.renderItem}
        />
      </div>
    );
  }
}

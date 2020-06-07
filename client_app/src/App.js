import React from "react";
import "./App.css";
import AddItemForm from './js/components/addItemForm';
import ItemsList from './js/components/itemsList';
import "antd/dist/antd.css";
import rx from './js/shared/rx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isResourceAdding: false,
            resources: []
        }
    }

    onResourceCreated = (resource) => {
        this.setState((prevState) => {
            const newResources = prevState.resources.slice();
            newResources.unshift(resource);

            return {
                ...prevState,
                resources: newResources,
                isResourceAdding: false
            };
        })
    }

    onResourcesFetched = (resources) => {
        this.setState( {
            resources,
            isLoading: false
        });
    }

    createResource = (resource) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                isResourceAdding: true
            }
        });

        rx.createResource({
            resource,
            onSuccess: this.onResourceCreated
        });
    }

    componentDidMount() {
        rx.getResources({
            onSuccess: this.onResourcesFetched
        });
    }

    render() {
        const { resources, isResourceAdding } = this.state;
      return (
        <div className="App">
          <AddItemForm onValidSubmit={this.createResource} isLoading={isResourceAdding}/>
          <ItemsList items={resources}/>
        </div>
      );
    }
}

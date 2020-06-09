import React from 'react';
import './App.css';
import AddResourceForm from './js/components/addResourceForm';
import ResourcesTable from './js/components/resourcesTable';
import 'antd/dist/antd.css';
import rx from './js/shared/rx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isResourceAdding: false,
            resources: [],
            formError: false,
            editingItemKey: false,
            editingItemUpdating: false
        };
    }

    componentDidMount() {
        rx.getResources({
            onSuccess: this.onResourcesFetched,
            onError: this.onError
        });
    }

    deleteResource = (resource) => {
        this.setState((prevState) => {
            const newResources = prevState.resources.filter(
                (r) => r.key !== resource.key
            );

            return {
                resources: newResources
            };
        });
    };

    onResourceDelete = ({ key }) => {
        rx.deleteResource({
            key,
            onSuccess: this.deleteResource,
            onError: this.onError
        });
    };

    onResourcesFetched = (resources) => {
        this.setState({
            resources,
            isLoading: false
        });
    };

    onResourceCreate = (resource) => {
        this.setState({
            isResourceAdding: true
        });

        rx.createResource({
            resource,
            onSuccess: this.createResource,
            onError: this.onError
        });
    };

    createResource = (resource) => {
        this.setState((prevState) => {
            const newResources = prevState.resources.slice();
            newResources.unshift(resource);

            return {
                resources: newResources,
                isResourceAdding: false,
                formError: false
            };
        });
    };

    onError = (formError) => {
        this.setState({
            isResourceAdding: false,
            formError
        });
    };

    onErrorClosed = () => {
        this.setState({
            formError: false
        });
    };

    onResourceUpdate = (resource) => {
        this.setState({
            editingItemUpdating: true
        });
        rx.updateResource({
            key: resource.key,
            value: resource.value,
            onSuccess: this.updateResource,
            onError: this.onError
        });
    };

    updateResource = (resource) => {
        const newResources = this.state.resources.slice();
        const index = newResources.findIndex(r => r.key === resource.key);
        if (index != -1) {
            newResources.splice(index, 1, resource);
        }

        this.setState({
            resources: newResources,
            editingItemUpdating: false,
            editingItemKey: false
        });
    }

    onResourceEdit = (key) => {
        this.setState({
            editingItemUpdating: false,
            editingItemKey: key
        });
    };

    render() {
        const {
            resources,
            isResourceAdding,
            isLoading,
            formError,
            editingItemKey,
            editingItemUpdating
        } = this.state;

        return (
            <div className="app">
                <AddResourceForm
                    onErrorClosed={this.onErrorClosed}
                    errorMessage={formError}
                    onValidSubmit={this.onResourceCreate}
                    isLoading={isResourceAdding}
                />
                <ResourcesTable
                    items={resources}
                    loading={isLoading}
                    onResourceDelete={this.onResourceDelete}
                    onResourceUpdate={this.onResourceUpdate}
                    onResourceEdit={this.onResourceEdit}
                    editingItem={{
                        key: editingItemKey,
                        updating: editingItemUpdating
                    }}
                />
            </div>
        );
    }
}

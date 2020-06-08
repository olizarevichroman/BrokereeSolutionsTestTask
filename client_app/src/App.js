import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import AddItemForm from './js/components/addItemForm';
import ItemsList from './js/components/itemsTable';
import 'antd/dist/antd.css';
import rx from './js/shared/rx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isResourceAdding: false,
            resources: [],
            formError: false
        };
    }

    deleteResource = (key) => {
        this.setState((prevState) => {
            const newResources = prevState.resources.filter(
                (r) => r.key !== key
            );

            return {
                resources: newResources
            };
        });
    };

    onResourceDelete = (key) => {
        rx.deleteResource({
            key,
            onSuccess: this.deleteResource
        });
    };

    onResourceCreated = (resource) => {
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

    onResourcesFetched = (resources) => {
        this.setState({
            resources,
            isLoading: false
        });
    };

    updateResource = (resource) => {
        console.log('resource', resource);
    }

    createResource = (resource) => {
        this.setState((prevState) => {
            return {
                isResourceAdding: true
            };
        });

        rx.createResource({
            resource,
            onSuccess: this.onResourceCreated,
            onError: this.onError
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

    componentDidMount() {
        rx.getResources({
            onSuccess: this.onResourcesFetched,
            onError: this.onError
        });
    }

    render() {
        const {
            resources,
            isResourceAdding,
            isLoading,
            formError
        } = this.state;

        return (
            <div className="app">
                <AddItemForm
                    onErrorClosed={this.onErrorClosed}
                    errorMessage={formError}
                    onValidSubmit={this.createResource}
                    isLoading={isResourceAdding}
                />
                <ItemsList
                    items={resources}
                    loading={isLoading}
                    onResourceDelete={this.onResourceDelete}
                    onSave={this.updateResource}
                />
            </div>
        );
    }
}

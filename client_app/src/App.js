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
            const index = prevState.resources.findIndex((r) => r.key === key);
            if (index !== -1) {
                const newResources = prevState.resources.slice();
                newResources.splice(index, 1);

                return {
                    ...prevState,
                    resources: newResources
                };
            }
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
                ...prevState,
                resources: newResources,
                isResourceAdding: false
            };
        });
    };

    onResourcesFetched = (resources) => {
        this.setState({
            resources,
            isLoading: false
        });
    };

    createResource = (resource) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                isResourceAdding: true
            };
        });

        rx.createResource({
            resource,
            onSuccess: this.onResourceCreated,
            onError: this.onFormError
        });
    };

    onFormError = (formError) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                isResourceAdding: false,
                formError
            }
        });
    }

    componentDidMount() {
        rx.getResources({
            onSuccess: this.onResourcesFetched
        });
    }

    render() {
        const { resources, isResourceAdding, isLoading, formError } = this.state;

        return (
            <div className="App">
                <AddItemForm
                    errorMessage={formError}
                    onValidSubmit={this.createResource}
                    isLoading={isResourceAdding}
                />
                <ItemsList
                    items={resources}
                    loading={isLoading}
                    onResourceDelete={this.onResourceDelete}
                />
            </div>
        );
    }
}

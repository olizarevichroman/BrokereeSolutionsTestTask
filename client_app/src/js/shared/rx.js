import http from './http';
import { API_URLS } from './constants';
import {
    showSuccessNotification,
    showErrorNotification
} from './notifications';

async function getResources({ onSuccess, onError }) {
    try {
        const response = await http.GET(API_URLS.RESOURCES_URL).send();
        if (response.ok && onSuccess instanceof Function) {
            const data = await response.json();
            onSuccess(data);
        }
        if (!response.ok && onError instanceof Function) {
            const errorMessage = await response.text();
            onError(errorMessage);
        }
    } catch (error) {
        showErrorNotification({
            description: 'Unexpected error, try to reload the page'
        });
    }
}

async function createResource({ resource, onSuccess, onError }) {
    try {
        if (!resource) {
            throw new Error('Resource cannot be null');
        }

        const response = await http.POST(API_URLS.RESOURCES_URL).send(resource);
        if (response.ok && onSuccess instanceof Function) {
            const data = await response.json();
            onSuccess(data);
            showSuccessNotification({
                description: `Resource "${resource.key}" has been successfully created`,
                title: 'Created'
            });
        }
        if (!response.ok && onError instanceof Function) {
            const errorMessage = await response.text();
            onError(errorMessage);
        }
    } catch (error) {
        onUnexpectedError(error.message);
    }
}

async function updateResource({ resource, onSuccess, onError }) {
    try {
        if (!resource) {
            throw new Error('Resource cannot be null');
        }

        const response = await http.PUT(API_URLS.RESOURCES_URL).send(resource);
        if (response.ok && onSuccess instanceof Function) {
            const data = await response.json();
            onSuccess(data);
        }
        if (!response.ok && onError instanceof Function) {
            const errorMessage = await response.text();
            onError(errorMessage);
        }
    } catch (error) {
        onUnexpectedError(error.message);
    }
}

async function deleteResource({ key, onSuccess, onError }) {
    const url = `${API_URLS.RESOURCES_URL}/${key}`;

    try {
        if (!key) {
            throw new Error('Key cannot be null');
        }

        const response = await http.DELETE(url).send();
        if (response.ok && onSuccess instanceof Function) {
            onSuccess(key);
            showSuccessNotification({
                description: `Resource "${key}" has been successfully deleted`,
                title: 'Deleted'
            });
        }
        if (!response.ok && onError instanceof Function) {
            const errorMessage = await response.text();
            onError(errorMessage);
        }
    } catch (error) {
        onUnexpectedError(error.message);
    }
}

function onUnexpectedError(message) {
    showErrorNotification({
        description: 'Unexpected error, try to reload the page'
    });
}

export default {
    getResources,
    updateResource,
    deleteResource,
    createResource
};

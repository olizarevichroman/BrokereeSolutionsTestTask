import http from './http';
import { API_URLS } from './constants';

async function getResources ({ onSuccess, onError }) {
    try {
        const response = await http.GET(API_URLS.RESOURCES_URL).send();
        const data = await response.json();
        if (onSuccess instanceof Function) {
            onSuccess(data);
        }
    }
    catch (error) {
        if (onError instanceof Function) {
            onError(error);
        }
    }
}

async function createResource ( { resource, onSuccess, onError }) {
    try {
        if (!resource) {
            throw new Error("Resource cannot be null");
        }

        const response = await http.POST(API_URLS.RESOURCES_URL).send(resource);
        if (response.ok && onSuccess instanceof Function) {
            const data = await response.json();
            onSuccess(data);
        }
        if (!response.ok && onError instanceof Function) {
            const errorMessage = await response.text();
            onError(errorMessage);
        }
    }
    catch (error) {
        if (onError instanceof Function) {
            onError(error);
        }
    }
}

function getResourceByKey ({ key, onSuccess, onError }) {
    const url = `${API_URLS.RESOURCES_URL}/${key}`;

    http.GET(url)
        .send()
        .then((response) => {
            if (onSuccess instanceof Function) {
                onSuccess(response)
            }
        })
        .catch((error) => {
            if (onError instanceof Function) {
                onError(error);
            }
        });
}

async function updateResource ({ resource, onSuccess, onError }) {
    try {
        if (!resource) {
            throw new Error("Resource cannot be null");
        }

        const response = await http.PUT(API_URLS.RESOURCES_URL).send(resource);
        const data = await response.json();
        if (onSuccess instanceof Function) {
            onSuccess(data);
        }
    }
    catch (error) {
        if (onError instanceof Function) {
            onError(error);
        }
    }
}

async function deleteResource ({ key, onSuccess, onError }) {
    const url = `${API_URLS.RESOURCES_URL}/${key}`;

    try {
        if (!key) {
            throw new Error("Key cannot be null");
        }

        const response = await http.DELETE(url).send();
        const data = await response.json();
        if (onSuccess instanceof Function) {
            onSuccess(data);
        }
    }
    catch (error) {
        if (onError instanceof Function) {
            onError(error);
        }
    }
}

export default {
    getResourceByKey,
    getResources,
    updateResource,
    deleteResource,
    createResource
};


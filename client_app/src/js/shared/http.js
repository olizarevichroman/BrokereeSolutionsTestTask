class ApiRequestExecutor {
    
    constructor(url, method) {
        this.url = url;
        this.method = method;
    }

    send = (body) => {
        const options = {
            method: this.method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body)
        }

        return fetch(this.url, options);
    }
}

export default class ApiRequest {
    
    static POST(url) {
        return new ApiRequestExecutor(url, 'POST');
    }

    static GET(url) {
        return new ApiRequestExecutor(url, 'GET');
    }

    static PUT(url) {
        return new ApiRequestExecutor(url, 'PUT');
    }

    static DELETE(url) {
        return new ApiRequestExecutor(url, 'DELETE');
    }
}
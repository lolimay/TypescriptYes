import { HTTPResponse } from './definitions';

export class HTTPRequest {
    public static async getAsync(url: string, responseType: XMLHttpRequestResponseType = 'text'): Promise<HTTPResponse> {
        return new Promise((resolve, reject) => {
            const xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    resolve({
                        success: true,
                        responseType,
                        response: xhr.response
                    });
                } else {
                    reject({
                        success: false,
                        responseType,
                        response: null
                    });
                }
            })

            xhr.responseType = responseType;
            xhr.open('get', url, true, null, null);
            xhr.send();
        });
    }
}
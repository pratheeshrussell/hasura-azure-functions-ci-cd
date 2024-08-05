import { HttpRequest, HttpResponseInit } from "@azure/functions"

export interface HasuraRequest<T> extends Omit<HttpRequest, 'json'>{ 
    json: () => Promise<T>
}
export interface HasuraResponse<T> extends Omit<HttpResponseInit, 'jsonBody'>{ 
    jsonBody: T 
}
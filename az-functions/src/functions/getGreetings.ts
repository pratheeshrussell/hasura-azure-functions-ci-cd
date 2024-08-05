import { app, HttpRequest, InvocationContext } from "@azure/functions";
import { GreetingBody } from "../types/getGreetings.type";
import { HasuraRequest, HasuraResponse } from "../types/hasuraReqResp";
import { GreetingOutput } from "../generated/graphql";

export async function getGreetings(
    request: HasuraRequest<GreetingBody>, 
    context: InvocationContext): Promise<HasuraResponse<GreetingOutput>> {
    
    const body = (await request.json());
    
    return { 
        jsonBody: {
            message: `Hello, ${body.input.username}!`
    } };
};

app.http('getGreetings', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: getGreetings
});

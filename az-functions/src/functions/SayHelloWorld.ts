import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function SayHelloWorld(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { 
        jsonBody: {
            "message":`Hello, ${name}!`,
            "secret": process.env["secret_name"]
        },
        
    };
};

app.http('SayHelloWorld', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: SayHelloWorld
});

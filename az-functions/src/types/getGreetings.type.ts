export type GreetingInput = {
    username: String
}

export type GreetingOutput = {
    message: String
}

type gqlQuery = string
export type GreetingBody = {
    action:{
        name:"getGreetings"
    },
    input:GreetingInput,
    request_query: gqlQuery
}
  

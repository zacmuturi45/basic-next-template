"use client"

import { ApolloClient, InMemoryCache, HttpLink, from, ApolloLink } from "@apollo/client"
import { onError } from "@apollo/client/link/error"


const errorLink = onError(({ graphQLErrors, networkError }) => {
    if(graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        });
    }
    
    //network error: An error object representing issues with the network or server, such as timeouts or unreachable servers. Both the networkError and graphQLErrors log the errors to the console useful for debugging.
    if (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
})


const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');

    //operation: This represents the GraphQL operation being executed e.g query or mutation
    //forward: A function that passes the operation to the next link in the chain.

    //Functionality: This function first receives the token from localStorage. If the token is found it sets the Authorization header with the token in the format Bearer <token>..
    //The operation is then forwarded to the next link, which will be the httpLink.
    if (token) {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    return forward(operation);
});


const httpLink = new HttpLink({ uri: "https://26a6-129-222-187-23.ngrok-free.app/graphql"});

const link = from([
    errorLink,
    authMiddleware.concat(httpLink),
]);


const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

export default client

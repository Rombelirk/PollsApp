import { ApolloLink, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
            types: [],
        },
    },
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:3000/graphql`,
    options: {
        reconnect: true,
    },
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('jwtToken');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
);

const link = ApolloLink.from([authLink, splitLink]);

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
    link,
    cache,
    connectToDevTools: true,
});

export default client;

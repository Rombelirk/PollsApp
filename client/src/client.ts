import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

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

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('jwtToken');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

console.log(httpLink, authLink)
const link = ApolloLink.from([authLink, httpLink]);

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
    link,
    cache,
    connectToDevTools: true,
});

export default client;

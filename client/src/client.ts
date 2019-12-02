import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
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

const link = ApolloLink.from([httpLink]);

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
    link,
    cache,
    connectToDevTools: true,
});

export default client;

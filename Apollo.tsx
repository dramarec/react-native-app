import { ApolloClient, InMemoryCache } from '@apollo/client';

const URI = 'https://23759erwg9.execute-api.eu-central-1.amazonaws.com/staging/graphql';

export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
});

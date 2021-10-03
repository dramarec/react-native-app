import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from './config'

const URI = config.API_URL

export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
});

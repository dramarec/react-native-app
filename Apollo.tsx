import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context"
import AsyncStorage from '@react-native-async-storage/async-storage';

import config from './config'

const URI = config.API_URL

const httpLink = createHttpLink({
    uri: URI,
});

const authLink = setContext(async (ctx, { headers }) => {
    // console.log("🔥🚀 ===> authLink ===> ctx", ctx);
    const token = await AsyncStorage.getItem('token');
    // console.log("🔥🚀 ===> authLink ===> token", token);
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
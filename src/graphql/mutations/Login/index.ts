import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation login($identifier: String!, $password: String!) {
        login(identifier: $identifier, password:$password) {
            token
            user {
                id
                username
            }
            communities {
                id
                name
                styleOverride
            }
        }
    }
`
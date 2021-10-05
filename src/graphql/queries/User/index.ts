import { gql } from "@apollo/client"

export const GET_USER_INFO = gql`
    query User($where: UserWhereUniqueInput!) {
        user(where: $where) {
            id
            email
            username
            firstName
            lastName
            role
            communitiesWhereMember {
                name
                id
                styleOverride
            } 
        }
    }


`

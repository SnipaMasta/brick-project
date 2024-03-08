import { gql } from '@apollo/client';

export const QUERY_LEGOSETS = gql`
    query GetLegoSets {
        legoSets {
            id
            name
            year
            theme
        }
    }
`;


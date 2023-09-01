import { graphql } from './generated';

export const CREATE_LAYER_MUTATION = graphql(`
    mutation CreateLayer($projectId: ID!, $type: LayerType!, $index: Int!, $circuit: GraphQLJSON, $fragment: String) {
        createLayer(projectId: $projectId, type: $type, index: $index, circuit: $circuit, fragment: $fragment) {
            ... on CircuitLayer {
                id
                name
                type
                enabled
                circuit
                blendingMode
                createdAt
                updatedAt
            }
            ... on FragmentLayer {
                id
                name
                type
                enabled
                fragment
                blendingMode
                createdAt
                updatedAt
            }
        }
    }
`);

export const DELETE_LAYER_MUTATION = graphql(`
    mutation DeleteLayer($id: ID!) {
        deleteLayer(id: $id)
    }
`);

export const FOLLOW_PROFILE_MUTATION = graphql(`
    mutation FollowProfile($id: ID!) {
        followProfile(id: $id) {
            id
            targetProfile {
                id
                username
            }
            createdAt
            updatedAt
        }
    }
`);

export const UNFOLLOW_PROFILE_MUTATION = graphql(`
    mutation UnfollowProfile($id: ID!) {
        unfollowProfile(id: $id)
    }
`);

export const UPDATE_LAYER_MUTATION = graphql(`
    mutation UpdateLayer(
        $id: ID!
        $projectId: ID!
        $name: String
        $enabled: Boolean
        $blendingMode: BlendingMode
        $index: Int
        $circuit: GraphQLJSON
        $fragment: String
    ) {
        updateLayer(
            id: $id
            projectId: $projectId
            name: $name
            enabled: $enabled
            blendingMode: $blendingMode
            index: $index
            circuit: $circuit
            fragment: $fragment
        ) {
            ... on CircuitLayer {
                id
                name
                type
                enabled
                circuit
                blendingMode
                index
                createdAt
                updatedAt
            }
            ... on FragmentLayer {
                id
                name
                type
                enabled
                fragment
                blendingMode
                index
                createdAt
                updatedAt
            }
        }
    }
`);

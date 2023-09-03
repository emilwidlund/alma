import { graphql } from './generated';

export const CREATE_LAYER_MUTATION = graphql(`
    mutation CreateLayer($projectId: ID!, $type: LayerType!, $circuit: GraphQLJSON, $fragment: String) {
        createLayer(projectId: $projectId, type: $type, circuit: $circuit, fragment: $fragment) {
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

export const UPDATE_LAYER_MUTATION = graphql(`
    mutation UpdateLayer(
        $id: ID!
        $projectId: ID!
        $name: String
        $enabled: Boolean
        $blendingMode: BlendingMode
        $circuit: GraphQLJSON
        $fragment: String
    ) {
        updateLayer(
            id: $id
            projectId: $projectId
            name: $name
            enabled: $enabled
            blendingMode: $blendingMode
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

export const UPDATE_PROJECT_MUTATION = graphql(`
    mutation UpdateProject(
        $id: ID!
        $name: String
        $description: String
        $visibility: ProjectVisibility
        $layerOrder: [ID!]
    ) {
        updateProject(
            id: $id
            name: $name
            description: $description
            visibility: $visibility
            layerOrder: $layerOrder
        ) {
            id
            name
            description
            owner {
                id
                username
            }
            layers {
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
            layerOrder
            createdAt
            updatedAt
        }
    }
`);

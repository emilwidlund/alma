import { graphql } from './generated';

export const PROJECT_QUERY = graphql(`
    query Project($id: ID!) {
        project(id: $id) {
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

export const PROFILE_QUERY = graphql(`
    query Profile($id: ID, $username: String) {
        profile(id: $id, username: $username) {
            id
            username
            image
            location
            bio
            website
            projects {
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
                createdAt
                updatedAt
            }
            following {
                targetProfile {
                    id
                    username
                }
            }
            followers {
                targetProfile {
                    id
                    username
                }
            }
            createdAt
            updatedAt
        }
    }
`);

export const ME_QUERY = graphql(`
    query Me {
        me {
            id
            username
            image
            location
            bio
            website
            projects {
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
                createdAt
                updatedAt
            }
            following {
                targetProfile {
                    id
                    username
                    image
                }
            }
            followers {
                targetProfile {
                    id
                    username
                    image
                }
            }
            subscription {
                id
            }
            createdAt
            updatedAt
        }
    }
`);

export const LAYER_QUERY = graphql(`
    query Layer($id: ID!) {
        layer(id: $id) {
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

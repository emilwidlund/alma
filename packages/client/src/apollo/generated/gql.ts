/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation CreateLayer($projectId: ID!, $type: LayerType!, $circuit: GraphQLJSON, $fragment: String) {\n        createLayer(projectId: $projectId, type: $type, circuit: $circuit, fragment: $fragment) {\n            ... on CircuitLayer {\n                id\n                name\n                type\n                enabled\n                circuit\n                blendingMode\n                createdAt\n                updatedAt\n            }\n            ... on FragmentLayer {\n                id\n                name\n                type\n                enabled\n                fragment\n                blendingMode\n                createdAt\n                updatedAt\n            }\n        }\n    }\n": types.CreateLayerDocument,
    "\n    mutation UpdateLayer(\n        $id: ID!\n        $projectId: ID!\n        $name: String\n        $enabled: Boolean\n        $blendingMode: BlendingMode\n        $circuit: GraphQLJSON\n        $fragment: String\n    ) {\n        updateLayer(\n            id: $id\n            projectId: $projectId\n            name: $name\n            enabled: $enabled\n            blendingMode: $blendingMode\n            circuit: $circuit\n            fragment: $fragment\n        ) {\n            ... on CircuitLayer {\n                id\n                name\n                type\n                enabled\n                circuit\n                blendingMode\n                createdAt\n                updatedAt\n            }\n            ... on FragmentLayer {\n                id\n                name\n                type\n                enabled\n                fragment\n                blendingMode\n                createdAt\n                updatedAt\n            }\n        }\n    }\n": types.UpdateLayerDocument,
    "\n    mutation DeleteLayer($id: ID!) {\n        deleteLayer(id: $id)\n    }\n": types.DeleteLayerDocument,
    "\n    mutation FollowProfile($id: ID!) {\n        followProfile(id: $id) {\n            id\n            targetProfile {\n                id\n                username\n            }\n            createdAt\n            updatedAt\n        }\n    }\n": types.FollowProfileDocument,
    "\n    mutation UnfollowProfile($id: ID!) {\n        unfollowProfile(id: $id)\n    }\n": types.UnfollowProfileDocument,
    "\n    mutation UpdateProject(\n        $id: ID!\n        $name: String\n        $description: String\n        $visibility: ProjectVisibility\n        $layerOrder: [ID!]\n    ) {\n        updateProject(\n            id: $id\n            name: $name\n            description: $description\n            visibility: $visibility\n            layerOrder: $layerOrder\n        ) {\n            id\n            name\n            description\n            owner {\n                id\n                username\n            }\n            layers {\n                ... on CircuitLayer {\n                    id\n                    name\n                    type\n                    enabled\n                    circuit\n                    blendingMode\n                    createdAt\n                    updatedAt\n                }\n                ... on FragmentLayer {\n                    id\n                    name\n                    type\n                    enabled\n                    fragment\n                    blendingMode\n                    createdAt\n                    updatedAt\n                }\n            }\n            layerOrder\n            createdAt\n            updatedAt\n        }\n    }\n": types.UpdateProjectDocument,
    "\n    query Project($id: ID!) {\n        project(id: $id) {\n            id\n            name\n            description\n            owner {\n                id\n                username\n            }\n            layers {\n                ... on CircuitLayer {\n                    id\n                    name\n                    type\n                    enabled\n                    circuit\n                    blendingMode\n                    createdAt\n                    updatedAt\n                }\n                ... on FragmentLayer {\n                    id\n                    name\n                    type\n                    enabled\n                    fragment\n                    blendingMode\n                    createdAt\n                    updatedAt\n                }\n            }\n            layerOrder\n            createdAt\n            updatedAt\n        }\n    }\n": types.ProjectDocument,
    "\n    query Profile($id: ID, $username: String) {\n        profile(id: $id, username: $username) {\n            id\n            username\n            image\n            location\n            bio\n            website\n            projects {\n                id\n                name\n                description\n                owner {\n                    id\n                    username\n                }\n                layers {\n                    ... on CircuitLayer {\n                        id\n                        name\n                        type\n                        enabled\n                        circuit\n                        blendingMode\n                        createdAt\n                        updatedAt\n                    }\n                    ... on FragmentLayer {\n                        id\n                        name\n                        type\n                        enabled\n                        fragment\n                        blendingMode\n                        createdAt\n                        updatedAt\n                    }\n                }\n                createdAt\n                updatedAt\n            }\n            following {\n                targetProfile {\n                    id\n                    username\n                }\n            }\n            followers {\n                targetProfile {\n                    id\n                    username\n                }\n            }\n            createdAt\n            updatedAt\n        }\n    }\n": types.ProfileDocument,
    "\n    query Me {\n        me {\n            id\n            username\n            image\n            location\n            bio\n            website\n            projects {\n                id\n                name\n                description\n                owner {\n                    id\n                    username\n                }\n                layers {\n                    ... on CircuitLayer {\n                        id\n                        name\n                        type\n                        enabled\n                        circuit\n                        blendingMode\n                        createdAt\n                        updatedAt\n                    }\n                    ... on FragmentLayer {\n                        id\n                        name\n                        type\n                        enabled\n                        fragment\n                        blendingMode\n                        createdAt\n                        updatedAt\n                    }\n                }\n                createdAt\n                updatedAt\n            }\n            following {\n                targetProfile {\n                    id\n                    username\n                    image\n                }\n            }\n            followers {\n                targetProfile {\n                    id\n                    username\n                    image\n                }\n            }\n            subscription {\n                id\n            }\n            createdAt\n            updatedAt\n        }\n    }\n": types.MeDocument,
    "\n    query Layer($id: ID!) {\n        layer(id: $id) {\n            ... on CircuitLayer {\n                id\n                name\n                type\n                enabled\n                circuit\n                blendingMode\n                createdAt\n                updatedAt\n            }\n            ... on FragmentLayer {\n                id\n                name\n                type\n                enabled\n                fragment\n                blendingMode\n                createdAt\n                updatedAt\n            }\n        }\n    }\n": types.LayerDocument,
    "\n    query EditorHeaderQuery($id: ID!) {\n        project(id: $id) {\n            id\n            name\n            visibility\n        }\n    }\n": types.EditorHeaderQueryDocument,
    "\n    query EditorContainer($projectId: ID!, $layerId: ID!) {\n        project(id: $projectId) {\n            id\n            layers {\n                ... on CircuitLayer {\n                    id\n                }\n                ... on FragmentLayer {\n                    id\n                }\n            }\n        }\n        layer(id: $layerId) {\n            ... on CircuitLayer {\n                id\n                type\n            }\n            ... on FragmentLayer {\n                id\n                type\n            }\n        }\n    }\n": types.EditorContainerDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateLayer($projectId: ID!, $type: LayerType!, $circuit: GraphQLJSON, $fragment: String) {\n        createLayer(projectId: $projectId, type: $type, circuit: $circuit, fragment: $fragment) {\n            ... on CircuitLayer {\n                id\n                name\n                type\n                enabled\n                circuit\n                blendingMode\n                createdAt\n                updatedAt\n            }\n            ... on FragmentLayer {\n                id\n                name\n                type\n                enabled\n                fragment\n                blendingMode\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation CreateLayer($projectId: ID!, $type: LayerType!, $circuit: GraphQLJSON, $fragment: String) {\n        createLayer(projectId: $projectId, type: $type, circuit: $circuit, fragment: $fragment) {\n            ... on CircuitLayer {\n                id\n                name\n                type\n                enabled\n                circuit\n                blendingMode\n                createdAt\n                updatedAt\n            }\n            ... on FragmentLayer {\n                id\n                name\n                type\n                enabled\n                fragment\n                blendingMode\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateLayer(\n        $id: ID!\n        $projectId: ID!\n        $name: String\n        $enabled: Boolean\n        $blendingMode: BlendingMode\n        $circuit: GraphQLJSON\n        $fragment: String\n    ) {\n        updateLayer(\n            id: $id\n            projectId: $projectId\n            name: $name\n            enabled: $enabled\n            blendingMode: $blendingMode\n            circuit: $circuit\n            fragment: $fragment\n        ) {\n            ... on CircuitLayer {\n                id\n                name\n                type\n                enabled\n                circuit\n                blendingMode\n                createdAt\n                updatedAt\n            }\n            ... on FragmentLayer {\n                id\n                name\n                type\n                enabled\n                fragment\n                blendingMode\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateLayer(\n        $id: ID!\n        $projectId: ID!\n        $name: String\n        $enabled: Boolean\n        $blendingMode: BlendingMode\n        $circuit: GraphQLJSON\n        $fragment: String\n    ) {\n        updateLayer(\n            id: $id\n            projectId: $projectId\n            name: $name\n            enabled: $enabled\n            blendingMode: $blendingMode\n            circuit: $circuit\n            fragment: $fragment\n        ) {\n            ... on CircuitLayer {\n                id\n                name\n                type\n                enabled\n                circuit\n                blendingMode\n                createdAt\n                updatedAt\n            }\n            ... on FragmentLayer {\n                id\n                name\n                type\n                enabled\n                fragment\n                blendingMode\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteLayer($id: ID!) {\n        deleteLayer(id: $id)\n    }\n"): (typeof documents)["\n    mutation DeleteLayer($id: ID!) {\n        deleteLayer(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation FollowProfile($id: ID!) {\n        followProfile(id: $id) {\n            id\n            targetProfile {\n                id\n                username\n            }\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation FollowProfile($id: ID!) {\n        followProfile(id: $id) {\n            id\n            targetProfile {\n                id\n                username\n            }\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UnfollowProfile($id: ID!) {\n        unfollowProfile(id: $id)\n    }\n"): (typeof documents)["\n    mutation UnfollowProfile($id: ID!) {\n        unfollowProfile(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateProject(\n        $id: ID!\n        $name: String\n        $description: String\n        $visibility: ProjectVisibility\n        $layerOrder: [ID!]\n    ) {\n        updateProject(\n            id: $id\n            name: $name\n            description: $description\n            visibility: $visibility\n            layerOrder: $layerOrder\n        ) {\n            id\n            name\n            description\n            owner {\n                id\n                username\n            }\n            layers {\n                ... on CircuitLayer {\n                    id\n                    name\n                    type\n                    enabled\n                    circuit\n                    blendingMode\n                    createdAt\n                    updatedAt\n                }\n                ... on FragmentLayer {\n                    id\n                    name\n                    type\n                    enabled\n                    fragment\n                    blendingMode\n                    createdAt\n                    updatedAt\n                }\n            }\n            layerOrder\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateProject(\n        $id: ID!\n        $name: String\n        $description: String\n        $visibility: ProjectVisibility\n        $layerOrder: [ID!]\n    ) {\n        updateProject(\n            id: $id\n            name: $name\n            description: $description\n            visibility: $visibility\n            layerOrder: $layerOrder\n        ) {\n            id\n            name\n            description\n            owner {\n                id\n                username\n            }\n            layers {\n                ... on CircuitLayer {\n                    id\n                    name\n                    type\n                    enabled\n                    circuit\n                    blendingMode\n                    createdAt\n                    updatedAt\n                }\n                ... on FragmentLayer {\n                    id\n                    name\n                    type\n                    enabled\n                    fragment\n                    blendingMode\n                    createdAt\n                    updatedAt\n                }\n            }\n            layerOrder\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Project($id: ID!) {\n        project(id: $id) {\n            id\n            name\n            description\n            owner {\n                id\n                username\n            }\n            layers {\n                ... on CircuitLayer {\n                    id\n                    name\n                    type\n                    enabled\n                    circuit\n                    blendingMode\n                    createdAt\n                    updatedAt\n                }\n                ... on FragmentLayer {\n                    id\n                    name\n                    type\n                    enabled\n                    fragment\n                    blendingMode\n                    createdAt\n                    updatedAt\n                }\n            }\n            layerOrder\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query Project($id: ID!) {\n        project(id: $id) {\n            id\n            name\n            description\n            owner {\n                id\n                username\n            }\n            layers {\n                ... on CircuitLayer {\n                    id\n                    name\n                    type\n                    enabled\n                    circuit\n                    blendingMode\n                    createdAt\n                    updatedAt\n                }\n                ... on FragmentLayer {\n                    id\n                    name\n                    type\n                    enabled\n                    fragment\n                    blendingMode\n                    createdAt\n                    updatedAt\n                }\n            }\n            layerOrder\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Profile($id: ID, $username: String) {\n        profile(id: $id, username: $username) {\n            id\n            username\n            image\n            location\n            bio\n            website\n            projects {\n                id\n                name\n                description\n                owner {\n                    id\n                    username\n                }\n                layers {\n                    ... on CircuitLayer {\n                        id\n                        name\n                        type\n                        enabled\n                        circuit\n                        blendingMode\n                        createdAt\n                        updatedAt\n                    }\n                    ... on FragmentLayer {\n                        id\n                        name\n                        type\n                        enabled\n                        fragment\n                        blendingMode\n                        createdAt\n                        updatedAt\n                    }\n                }\n                createdAt\n                updatedAt\n            }\n            following {\n                targetProfile {\n                    id\n                    username\n                }\n            }\n            followers {\n                targetProfile {\n                    id\n                    username\n                }\n            }\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query Profile($id: ID, $username: String) {\n        profile(id: $id, username: $username) {\n            id\n            username\n            image\n            location\n            bio\n            website\n            projects {\n                id\n                name\n                description\n                owner {\n                    id\n                    username\n                }\n                layers {\n                    ... on CircuitLayer {\n                        id\n                        name\n                        type\n                        enabled\n                        circuit\n                        blendingMode\n                        createdAt\n                        updatedAt\n                    }\n                    ... on FragmentLayer {\n                        id\n                        name\n                        type\n                        enabled\n                        fragment\n                        blendingMode\n                        createdAt\n                        updatedAt\n                    }\n                }\n                createdAt\n                updatedAt\n            }\n            following {\n                targetProfile {\n                    id\n                    username\n                }\n            }\n            followers {\n                targetProfile {\n                    id\n                    username\n                }\n            }\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Me {\n        me {\n            id\n            username\n            image\n            location\n            bio\n            website\n            projects {\n                id\n                name\n                description\n                owner {\n                    id\n                    username\n                }\n                layers {\n                    ... on CircuitLayer {\n                        id\n                        name\n                        type\n                        enabled\n                        circuit\n                        blendingMode\n                        createdAt\n                        updatedAt\n                    }\n                    ... on FragmentLayer {\n                        id\n                        name\n                        type\n                        enabled\n                        fragment\n                        blendingMode\n                        createdAt\n                        updatedAt\n                    }\n                }\n                createdAt\n                updatedAt\n            }\n            following {\n                targetProfile {\n                    id\n                    username\n                    image\n                }\n            }\n            followers {\n                targetProfile {\n                    id\n                    username\n                    image\n                }\n            }\n            subscription {\n                id\n            }\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query Me {\n        me {\n            id\n            username\n            image\n            location\n            bio\n            website\n            projects {\n                id\n                name\n                description\n                owner {\n                    id\n                    username\n                }\n                layers {\n                    ... on CircuitLayer {\n                        id\n                        name\n                        type\n                        enabled\n                        circuit\n                        blendingMode\n                        createdAt\n                        updatedAt\n                    }\n                    ... on FragmentLayer {\n                        id\n                        name\n                        type\n                        enabled\n                        fragment\n                        blendingMode\n                        createdAt\n                        updatedAt\n                    }\n                }\n                createdAt\n                updatedAt\n            }\n            following {\n                targetProfile {\n                    id\n                    username\n                    image\n                }\n            }\n            followers {\n                targetProfile {\n                    id\n                    username\n                    image\n                }\n            }\n            subscription {\n                id\n            }\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Layer($id: ID!) {\n        layer(id: $id) {\n            ... on CircuitLayer {\n                id\n                name\n                type\n                enabled\n                circuit\n                blendingMode\n                createdAt\n                updatedAt\n            }\n            ... on FragmentLayer {\n                id\n                name\n                type\n                enabled\n                fragment\n                blendingMode\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"): (typeof documents)["\n    query Layer($id: ID!) {\n        layer(id: $id) {\n            ... on CircuitLayer {\n                id\n                name\n                type\n                enabled\n                circuit\n                blendingMode\n                createdAt\n                updatedAt\n            }\n            ... on FragmentLayer {\n                id\n                name\n                type\n                enabled\n                fragment\n                blendingMode\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query EditorHeaderQuery($id: ID!) {\n        project(id: $id) {\n            id\n            name\n            visibility\n        }\n    }\n"): (typeof documents)["\n    query EditorHeaderQuery($id: ID!) {\n        project(id: $id) {\n            id\n            name\n            visibility\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query EditorContainer($projectId: ID!, $layerId: ID!) {\n        project(id: $projectId) {\n            id\n            layers {\n                ... on CircuitLayer {\n                    id\n                }\n                ... on FragmentLayer {\n                    id\n                }\n            }\n        }\n        layer(id: $layerId) {\n            ... on CircuitLayer {\n                id\n                type\n            }\n            ... on FragmentLayer {\n                id\n                type\n            }\n        }\n    }\n"): (typeof documents)["\n    query EditorContainer($projectId: ID!, $layerId: ID!) {\n        project(id: $projectId) {\n            id\n            layers {\n                ... on CircuitLayer {\n                    id\n                }\n                ... on FragmentLayer {\n                    id\n                }\n            }\n        }\n        layer(id: $layerId) {\n            ... on CircuitLayer {\n                id\n                type\n            }\n            ... on FragmentLayer {\n                id\n                type\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
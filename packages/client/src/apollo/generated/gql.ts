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
    "mutation CreateLayer($projectId: ID!, $type: LayerType!, $index: Int!, $circuit: GraphQLJSON, $fragment: String) {\n  createLayer(\n    projectId: $projectId\n    type: $type\n    index: $index\n    circuit: $circuit\n    fragment: $fragment\n  ) {\n    ... on CircuitLayer {\n      id\n      name\n      type\n      enabled\n      circuit\n      blendingMode\n      createdAt\n      updatedAt\n    }\n    ... on FragmentLayer {\n      id\n      name\n      type\n      enabled\n      fragment\n      blendingMode\n      createdAt\n      updatedAt\n    }\n  }\n}": types.CreateLayerDocument,
    "mutation DeleteLayer($id: ID!) {\n  deleteLayer(id: $id)\n}": types.DeleteLayerDocument,
    "mutation FollowProfile($id: ID!) {\n  followProfile(id: $id) {\n    id\n    targetProfile {\n      id\n      username\n    }\n    createdAt\n    updatedAt\n  }\n}": types.FollowProfileDocument,
    "mutation UnfollowProfile($id: ID!) {\n  unfollowProfile(id: $id)\n}": types.UnfollowProfileDocument,
    "mutation UpdateLayer($id: ID!, $projectId: ID!, $name: String, $enabled: Boolean, $blendingMode: BlendingMode, $index: Int, $circuit: GraphQLJSON, $fragment: String) {\n  updateLayer(\n    id: $id\n    projectId: $projectId\n    name: $name\n    enabled: $enabled\n    blendingMode: $blendingMode\n    index: $index\n    circuit: $circuit\n    fragment: $fragment\n  ) {\n    ... on CircuitLayer {\n      id\n      name\n      type\n      enabled\n      circuit\n      blendingMode\n      index\n      createdAt\n      updatedAt\n    }\n    ... on FragmentLayer {\n      id\n      name\n      type\n      enabled\n      fragment\n      blendingMode\n      index\n      createdAt\n      updatedAt\n    }\n  }\n}": types.UpdateLayerDocument,
    "query Layer($id: ID!) {\n  layer(id: $id) {\n    ... on CircuitLayer {\n      id\n      name\n      type\n      enabled\n      circuit\n      blendingMode\n      index\n      createdAt\n      updatedAt\n    }\n    ... on FragmentLayer {\n      id\n      name\n      type\n      enabled\n      fragment\n      blendingMode\n      index\n      createdAt\n      updatedAt\n    }\n  }\n}": types.LayerDocument,
    "query Me {\n  me {\n    id\n    username\n    image\n    location\n    bio\n    website\n    projects {\n      id\n      name\n      owner {\n        id\n        username\n      }\n      layers {\n        ... on CircuitLayer {\n          id\n          name\n          type\n          enabled\n          circuit\n          blendingMode\n          createdAt\n          updatedAt\n        }\n        ... on FragmentLayer {\n          id\n          name\n          type\n          enabled\n          fragment\n          blendingMode\n          createdAt\n          updatedAt\n        }\n      }\n      createdAt\n      updatedAt\n    }\n    following {\n      targetProfile {\n        id\n        username\n        image\n      }\n    }\n    followers {\n      targetProfile {\n        id\n        username\n        image\n      }\n    }\n    subscription {\n      id\n    }\n    createdAt\n    updatedAt\n  }\n}": types.MeDocument,
    "query Profile($id: ID, $username: String) {\n  profile(id: $id, username: $username) {\n    id\n    username\n    image\n    location\n    bio\n    website\n    projects {\n      id\n      name\n      owner {\n        id\n        username\n      }\n      layers {\n        ... on CircuitLayer {\n          id\n          name\n          type\n          enabled\n          circuit\n          blendingMode\n          createdAt\n          updatedAt\n        }\n        ... on FragmentLayer {\n          id\n          name\n          type\n          enabled\n          fragment\n          blendingMode\n          createdAt\n          updatedAt\n        }\n      }\n      createdAt\n      updatedAt\n    }\n    following {\n      targetProfile {\n        id\n        username\n      }\n    }\n    followers {\n      targetProfile {\n        id\n        username\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}": types.ProfileDocument,
    "query Project($id: ID!) {\n  project(id: $id) {\n    id\n    name\n    owner {\n      id\n      username\n    }\n    layers {\n      ... on CircuitLayer {\n        id\n        name\n        type\n        enabled\n        circuit\n        blendingMode\n        index\n        createdAt\n        updatedAt\n      }\n      ... on FragmentLayer {\n        id\n        name\n        type\n        enabled\n        fragment\n        blendingMode\n        index\n        createdAt\n        updatedAt\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}": types.ProjectDocument,
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
export function graphql(source: "mutation CreateLayer($projectId: ID!, $type: LayerType!, $index: Int!, $circuit: GraphQLJSON, $fragment: String) {\n  createLayer(\n    projectId: $projectId\n    type: $type\n    index: $index\n    circuit: $circuit\n    fragment: $fragment\n  ) {\n    ... on CircuitLayer {\n      id\n      name\n      type\n      enabled\n      circuit\n      blendingMode\n      createdAt\n      updatedAt\n    }\n    ... on FragmentLayer {\n      id\n      name\n      type\n      enabled\n      fragment\n      blendingMode\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation CreateLayer($projectId: ID!, $type: LayerType!, $index: Int!, $circuit: GraphQLJSON, $fragment: String) {\n  createLayer(\n    projectId: $projectId\n    type: $type\n    index: $index\n    circuit: $circuit\n    fragment: $fragment\n  ) {\n    ... on CircuitLayer {\n      id\n      name\n      type\n      enabled\n      circuit\n      blendingMode\n      createdAt\n      updatedAt\n    }\n    ... on FragmentLayer {\n      id\n      name\n      type\n      enabled\n      fragment\n      blendingMode\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteLayer($id: ID!) {\n  deleteLayer(id: $id)\n}"): (typeof documents)["mutation DeleteLayer($id: ID!) {\n  deleteLayer(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation FollowProfile($id: ID!) {\n  followProfile(id: $id) {\n    id\n    targetProfile {\n      id\n      username\n    }\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation FollowProfile($id: ID!) {\n  followProfile(id: $id) {\n    id\n    targetProfile {\n      id\n      username\n    }\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UnfollowProfile($id: ID!) {\n  unfollowProfile(id: $id)\n}"): (typeof documents)["mutation UnfollowProfile($id: ID!) {\n  unfollowProfile(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateLayer($id: ID!, $projectId: ID!, $name: String, $enabled: Boolean, $blendingMode: BlendingMode, $index: Int, $circuit: GraphQLJSON, $fragment: String) {\n  updateLayer(\n    id: $id\n    projectId: $projectId\n    name: $name\n    enabled: $enabled\n    blendingMode: $blendingMode\n    index: $index\n    circuit: $circuit\n    fragment: $fragment\n  ) {\n    ... on CircuitLayer {\n      id\n      name\n      type\n      enabled\n      circuit\n      blendingMode\n      index\n      createdAt\n      updatedAt\n    }\n    ... on FragmentLayer {\n      id\n      name\n      type\n      enabled\n      fragment\n      blendingMode\n      index\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation UpdateLayer($id: ID!, $projectId: ID!, $name: String, $enabled: Boolean, $blendingMode: BlendingMode, $index: Int, $circuit: GraphQLJSON, $fragment: String) {\n  updateLayer(\n    id: $id\n    projectId: $projectId\n    name: $name\n    enabled: $enabled\n    blendingMode: $blendingMode\n    index: $index\n    circuit: $circuit\n    fragment: $fragment\n  ) {\n    ... on CircuitLayer {\n      id\n      name\n      type\n      enabled\n      circuit\n      blendingMode\n      index\n      createdAt\n      updatedAt\n    }\n    ... on FragmentLayer {\n      id\n      name\n      type\n      enabled\n      fragment\n      blendingMode\n      index\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Layer($id: ID!) {\n  layer(id: $id) {\n    ... on CircuitLayer {\n      id\n      name\n      type\n      enabled\n      circuit\n      blendingMode\n      index\n      createdAt\n      updatedAt\n    }\n    ... on FragmentLayer {\n      id\n      name\n      type\n      enabled\n      fragment\n      blendingMode\n      index\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query Layer($id: ID!) {\n  layer(id: $id) {\n    ... on CircuitLayer {\n      id\n      name\n      type\n      enabled\n      circuit\n      blendingMode\n      index\n      createdAt\n      updatedAt\n    }\n    ... on FragmentLayer {\n      id\n      name\n      type\n      enabled\n      fragment\n      blendingMode\n      index\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    id\n    username\n    image\n    location\n    bio\n    website\n    projects {\n      id\n      name\n      owner {\n        id\n        username\n      }\n      layers {\n        ... on CircuitLayer {\n          id\n          name\n          type\n          enabled\n          circuit\n          blendingMode\n          createdAt\n          updatedAt\n        }\n        ... on FragmentLayer {\n          id\n          name\n          type\n          enabled\n          fragment\n          blendingMode\n          createdAt\n          updatedAt\n        }\n      }\n      createdAt\n      updatedAt\n    }\n    following {\n      targetProfile {\n        id\n        username\n        image\n      }\n    }\n    followers {\n      targetProfile {\n        id\n        username\n        image\n      }\n    }\n    subscription {\n      id\n    }\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    username\n    image\n    location\n    bio\n    website\n    projects {\n      id\n      name\n      owner {\n        id\n        username\n      }\n      layers {\n        ... on CircuitLayer {\n          id\n          name\n          type\n          enabled\n          circuit\n          blendingMode\n          createdAt\n          updatedAt\n        }\n        ... on FragmentLayer {\n          id\n          name\n          type\n          enabled\n          fragment\n          blendingMode\n          createdAt\n          updatedAt\n        }\n      }\n      createdAt\n      updatedAt\n    }\n    following {\n      targetProfile {\n        id\n        username\n        image\n      }\n    }\n    followers {\n      targetProfile {\n        id\n        username\n        image\n      }\n    }\n    subscription {\n      id\n    }\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Profile($id: ID, $username: String) {\n  profile(id: $id, username: $username) {\n    id\n    username\n    image\n    location\n    bio\n    website\n    projects {\n      id\n      name\n      owner {\n        id\n        username\n      }\n      layers {\n        ... on CircuitLayer {\n          id\n          name\n          type\n          enabled\n          circuit\n          blendingMode\n          createdAt\n          updatedAt\n        }\n        ... on FragmentLayer {\n          id\n          name\n          type\n          enabled\n          fragment\n          blendingMode\n          createdAt\n          updatedAt\n        }\n      }\n      createdAt\n      updatedAt\n    }\n    following {\n      targetProfile {\n        id\n        username\n      }\n    }\n    followers {\n      targetProfile {\n        id\n        username\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query Profile($id: ID, $username: String) {\n  profile(id: $id, username: $username) {\n    id\n    username\n    image\n    location\n    bio\n    website\n    projects {\n      id\n      name\n      owner {\n        id\n        username\n      }\n      layers {\n        ... on CircuitLayer {\n          id\n          name\n          type\n          enabled\n          circuit\n          blendingMode\n          createdAt\n          updatedAt\n        }\n        ... on FragmentLayer {\n          id\n          name\n          type\n          enabled\n          fragment\n          blendingMode\n          createdAt\n          updatedAt\n        }\n      }\n      createdAt\n      updatedAt\n    }\n    following {\n      targetProfile {\n        id\n        username\n      }\n    }\n    followers {\n      targetProfile {\n        id\n        username\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Project($id: ID!) {\n  project(id: $id) {\n    id\n    name\n    owner {\n      id\n      username\n    }\n    layers {\n      ... on CircuitLayer {\n        id\n        name\n        type\n        enabled\n        circuit\n        blendingMode\n        index\n        createdAt\n        updatedAt\n      }\n      ... on FragmentLayer {\n        id\n        name\n        type\n        enabled\n        fragment\n        blendingMode\n        index\n        createdAt\n        updatedAt\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query Project($id: ID!) {\n  project(id: $id) {\n    id\n    name\n    owner {\n      id\n      username\n    }\n    layers {\n      ... on CircuitLayer {\n        id\n        name\n        type\n        enabled\n        circuit\n        blendingMode\n        index\n        createdAt\n        updatedAt\n      }\n      ... on FragmentLayer {\n        id\n        name\n        type\n        enabled\n        fragment\n        blendingMode\n        index\n        createdAt\n        updatedAt\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
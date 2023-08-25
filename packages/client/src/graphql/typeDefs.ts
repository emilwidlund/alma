import gql from 'graphql-tag';

export const typeDefs = gql`
    scalar Date
    scalar GraphQLJSON

    type Profile {
        id: String!
        username: String!
        image: String
        location: String
        bio: String
        website: String
        projects: [Project]!
        likes: [Like]!
        comments: [Comment]!
        following: [Relationship]
        followers: [Relationship]
        createdAt: Date!
        updatedAt: Date!
    }

    type Relationship {
        id: String!
        profile: Profile!
        targetUser: Profile!
        createdAt: Date!
        updatedAt: Date!
    }

    enum LayerType {
        FRAGMENT
        CIRCUIT
    }

    enum BlendingMode {
        NONE
        NORMAL
        ADD
        SCREEN
        MULTIPLY
        OVERLAY
    }

    type FragmentLayer {
        id: String!
        name: String!
        enabled: Boolean!
        blendingMode: BlendingMode!
        type: LayerType!
        context: String!
        project: Project!
        createdA: Date!
        updatedAt: Date!
    }

    type CircuitLayer {
        id: String!
        name: String!
        enabled: Boolean!
        blendingMode: BlendingMode!
        type: LayerType!
        context: GraphQLJSON!
        project: Project!
        createdA: Date!
        updatedAt: Date!
    }

    union Layer = FragmentLayer | CircuitLayer

    type Like {
        id: String!
        project: Project!
        profile: Profile!
        createdAt: Date!
        updatedAt: Date!
    }

    type Comment {
        id: String!
        project: Project!
        profile: Profile!
        text: String!
        createdAt: Date!
        updatedAt: Date!
    }

    type Project {
        id: String!
        name: String!
        layers: [Layer]!
        private: Boolean!
        owner: Profile!
        likes: [Like]!
        comments: [Comment]!
        createdAt: Date!
        updatedAt: Date!
    }

    type Query {
        profile(id: String, username: String): Profile
        project(id: String!): Project
        projects(profileId: String!): [Project]!
    }
`;

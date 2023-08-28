import gql from 'graphql-tag';

export const typeDefs = gql`
    scalar Date
    scalar GraphQLJSON

    type Profile {
        id: String!
        userId: String!
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
        subscription: Subscription
        createdAt: Date!
        updatedAt: Date!
    }

    type Relationship {
        id: String!
        profile: Profile!
        targetProfile: Profile!
        createdAt: Date!
        updatedAt: Date!
    }

    type Subscription {
        id: String!
        profile: Profile!
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
        fragment: String!
        project: Project!
        index: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    type CircuitLayer {
        id: String!
        name: String!
        enabled: Boolean!
        blendingMode: BlendingMode!
        type: LayerType!
        circuit: GraphQLJSON!
        project: Project!
        index: Int!
        createdAt: Date!
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

    enum ProjectVisibility {
        PUBLIC
        PRIVATE
    }

    type Project {
        id: String!
        name: String!
        layers: [Layer]!
        visibility: ProjectVisibility!
        owner: Profile!
        likes: [Like]!
        comments: [Comment]!
        origin: Project
        forks: [Project]
        createdAt: Date!
        updatedAt: Date!
    }

    type Query {
        me: Profile
        profile(id: String, username: String): Profile
        project(id: String!): Project
        projects(profileId: String!): [Project]!
        feed: [Project]!
        searchProfiles(query: String!, limit: Int!): [Profile]!
        searchProjects(query: String!, limit: Int!): [Project]!
    }

    type Mutation {
        updateProfile(username: String, bio: String, website: String, image: String): Profile!
        followProfile(id: String!): Relationship!
        unfollowProfile(id: String!): Boolean!
        createProject: Project!
        updateProject(id: String!, name: String, visibility: ProjectVisibility): Project!
        deleteProject(id: String!): Boolean!
        forkProject(id: String): Project!
        createLayer(projectId: String!, type: LayerType!, index: Int!, circuit: GraphQLJSON, fragment: String): Layer!
        updateLayer(
            id: String!
            name: String
            enabled: Boolean
            blendingMode: BlendingMode
            index: Int
            circuit: GraphQLJSON
            fragment: String
        ): Layer!
        deleteLayer(id: String): Boolean!
    }
`;

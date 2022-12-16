export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteProject: Project;
  updateProject: Project;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  circuit: InputMaybe<Scalars['JSONObject']>;
  id: Scalars['String'];
  mediaUrl: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  private: InputMaybe<Scalars['Boolean']>;
};

export type Project = {
  __typename?: 'Project';
  circuit: Scalars['JSONObject'];
  createdAt: Scalars['DateTime'];
  deletedAt: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  mediaUrl: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner: User;
  ownerId: Scalars['String'];
  private: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  getProject: Project;
  getProjects: Array<Project>;
  getUser: Maybe<User>;
  me: User;
};


export type QueryGetProjectArgs = {
  id: Scalars['String'];
};


export type QueryGetProjectsArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  projectUpdate: Project;
};


export type SubscriptionProjectUpdateArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  deletedAt: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  mediaUrl: Maybe<Scalars['String']>;
  name: Scalars['String'];
  projects: Array<Project>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

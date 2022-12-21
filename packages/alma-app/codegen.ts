import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: '../alma-server/generated/schema.gql',
    documents: ['src/apollo/**/*.gql'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './src/generated/graphql/index.ts': {
            config: {
                avoidOptionals: true,
                maybeValue: 'T | undefined'
            },
            plugins: ['typescript']
        }
    }
};

export default config;

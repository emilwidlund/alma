import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'src/graphql/schema.gql',
    documents: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.gql'],
    generates: {
        './src/apollo/generated/': {
            preset: 'client',
            plugins: []
        }
    }
};

export default config;

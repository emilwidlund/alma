import fs from 'fs';
import path from 'path';
import { emitSchemaDefinitionFile } from 'type-graphql';
import 'reflect-metadata';

import { schema } from './src/graphql/schema';

/** Generates the GraphQL Schema */
const generateSchema = async () => {
    if (!fs.existsSync(path.resolve('./', 'generated'))) {
        fs.mkdirSync(path.resolve('./', 'generated'));
    }

    await emitSchemaDefinitionFile('./generated/schema.gql', await schema);
};

generateSchema();

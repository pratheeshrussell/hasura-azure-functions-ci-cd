
import type { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';
import path = require('path');

dotenv.config({
  path:path.resolve(process.cwd(), '../hasura-metadata/.env')
}); 

const schema_path = `${process.env.HASURA_GRAPHQL_ENDPOINT}/v1/graphql`;
const secret_key =  process.env.HASURA_GRAPHQL_ADMIN_SECRET;

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
        [schema_path]: {
            headers: {
              "x-hasura-admin-secret": secret_key,
            },
        },
    },
],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;

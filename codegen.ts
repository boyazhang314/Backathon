
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "types/schema.graphql",
  generates: {
    "types/graphql.d.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;

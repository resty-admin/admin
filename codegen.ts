import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "http://localhost:3000/graphql",
	documents: "src/**/*.graphql",
	generates: {
		"src/graphql.ts": {
			plugins: ["typescript"]
		},
		"src/": {
			preset: "near-operation-file",
			presetConfig: { extension: ".ts", baseTypesPath: "graphql.ts" },
			plugins: ["typescript-operations", "typescript-apollo-angular"]
		},
		"./graphql.schema.json": {
			plugins: ["introspection"]
		}
	},
	hooks: { afterAllFileWrite: ["prettier --write", "eslint --fix"] }
};

export default config;
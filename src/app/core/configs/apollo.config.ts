import { environment } from "@env/environment";
import type { IApolloConfig } from "@shared/modules/apollo";

export const APOLLO_CONFIG: IApolloConfig = {
	url: environment.graphqlUrl,
	production: environment.production
};

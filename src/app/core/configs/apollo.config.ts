import { environment } from "../../../environments/environment";
import type { IApolloConfig } from "../../shared/modules/apollo";

export const APOLLO_CONFIG: IApolloConfig = {
	url: environment.graphqlUrl
};

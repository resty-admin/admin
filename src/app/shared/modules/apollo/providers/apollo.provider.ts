import { InMemoryCache } from "@apollo/client/core";
import { APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";

export function getApolloProvider(uri: string, production: boolean) {
	return {
		provide: APOLLO_OPTIONS,
		useFactory(httpLink: HttpLink) {
			return {
				cache: new InMemoryCache(),
				link: httpLink.create({ uri }),
				connectToDevTools: !production
			};
		},
		deps: [HttpLink]
	};
}

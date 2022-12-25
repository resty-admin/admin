import { Injectable } from "@angular/core";
import type { QueryRef } from "apollo-angular";
import type { WatchQueryOptions } from "apollo-angular";
import { Apollo } from "apollo-angular";

@Injectable({ providedIn: "root" })
export class ApolloService {
	constructor(private readonly _apollo: Apollo) {}

	watchQuery<TData, TVariables = Record<string, any>>(
		options: WatchQueryOptions<TVariables, TData>
	): QueryRef<TData, TVariables> {
		return this._apollo.watchQuery<TData, TVariables>(options);
	}
}

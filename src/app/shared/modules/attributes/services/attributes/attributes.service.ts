import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import { ATTRIBUTES_ENDPOINTS } from "src/app/shared/endpoints";
import type { IAttribute } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { ApolloService } from "src/app/shared/modules/apollo";

import { ATTRIBUTE_QUERY, ATTRIBUTES_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AttributesService {
	readonly attributesQuery = this._apolloService.watchQuery<any>({
		query: ATTRIBUTES_QUERY,
		variables: { take: 5, skip: 0, filtersString: "" }
	});

	readonly attributes$ = this.attributesQuery.valueChanges.pipe(map(({ data }) => data.attributes?.data));

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async getAttributes(placeId: string) {
		await this.attributesQuery.setVariables({ filtersString: `?placeId=${placeId}` });

		return this.attributesQuery.valueChanges.pipe(map(({ data }) => data.attributes?.data));
	}

	async refetchAttributes() {
		await this.attributesQuery.refetch();
	}

	getAttribute(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: ATTRIBUTE_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.category));
	}

	createAttribute(attribute: Partial<IAttribute>) {
		return this._apiService.post<IAttribute>(ATTRIBUTES_ENDPOINTS.CREATE_ATTRIBUTE, attribute);
	}

	updateAttribute(id: string, attribute: Partial<IAttribute>) {
		return this._apiService.patch<IAttribute>(ATTRIBUTES_ENDPOINTS.UPDATE_ATTRIBUTE.replace(DYNAMIC_ID, id), attribute);
	}

	deleteAttribute(id: string) {
		return this._apiService.delete(ATTRIBUTES_ENDPOINTS.DELETE_ATTRIBUTE.replace(DYNAMIC_ID, id));
	}
}

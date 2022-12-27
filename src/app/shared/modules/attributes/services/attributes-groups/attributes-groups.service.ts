import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import { ATTRIBUTES_GROUPS_ENDPOINTS } from "src/app/shared/endpoints";
import type { IAttributesGroup } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { ApolloService } from "src/app/shared/modules/apollo";

import { ATTRIBUTES_GROUP_QUERY, ATTRIBUTES_GROUPS_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AttributesGroupsService {
	readonly attributesGroupsQuery = this._apolloService.watchQuery<any>({
		query: ATTRIBUTES_GROUPS_QUERY,
		variables: { take: 5, skip: 0, filtersString: "" }
	});

	readonly attributesGroups$ = this.attributesGroupsQuery.valueChanges.pipe(
		map(({ data }) => data.attributeGroups?.data)
	);

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async getAttributesGroups(placeId: string) {
		await this.attributesGroupsQuery.setVariables({ filtersString: `?placeId=${placeId}` });

		return this.attributesGroupsQuery.valueChanges.pipe(map(({ data }) => data.attributesGroups.data));
	}

	async refetchAttributesGroups() {
		await this.attributesGroupsQuery.refetch();
	}

	getAttributesGroup(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: ATTRIBUTES_GROUP_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.attributeGroup));
	}

	createAttributesGroup(attribute: Partial<IAttributesGroup>) {
		return this._apiService.post<IAttributesGroup>(ATTRIBUTES_GROUPS_ENDPOINTS.CREATE_ATTRIBUTES_GROUP, attribute);
	}

	updateAttributesGroup(id: string, attribute: Partial<IAttributesGroup>) {
		return this._apiService.patch<IAttributesGroup>(
			ATTRIBUTES_GROUPS_ENDPOINTS.UPDATE_ATTRIBUTES_GROUP.replace(DYNAMIC_ID, id),
			attribute
		);
	}

	deleteAttributesGroup(id: string) {
		return this._apiService.delete(ATTRIBUTES_GROUPS_ENDPOINTS.DELETE_ATTRIBUTES_GROUP.replace(DYNAMIC_ID, id));
	}
}

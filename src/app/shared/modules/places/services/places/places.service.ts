import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import type { IPlace } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { ApolloService } from "src/app/shared/modules/apollo";

import { PLACES_ENDPOINTS } from "../../../../endpoints";
import { PLACE_QUERY, PLACES_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PlacesService {
	readonly placesQuery = this._apolloService.watchQuery<any>({ query: PLACES_QUERY, variables: { take: 5, skip: 0 } });
	readonly places$ = this.placesQuery.valueChanges.pipe(map(({ data }) => data.places.data));

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async refetchPlaces() {
		await this.placesQuery.refetch();
	}

	getPlace(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: PLACE_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.place));
	}

	createPlace(place: Partial<IPlace>) {
		return this._apiService.post<IPlace>(PLACES_ENDPOINTS.CREATE_PLACE, place);
	}

	updatePlace(id: string, place: Partial<IPlace>) {
		return this._apiService.patch<IPlace>(PLACES_ENDPOINTS.UPDATE_PLACE.replace(DYNAMIC_ID, id), place);
	}

	deletePlace(id: string) {
		return this._apiService.delete(PLACES_ENDPOINTS.DELETE_PLACE.replace(DYNAMIC_ID, id));
	}
}

import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import type { IHall } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { ApolloService } from "src/app/shared/modules/apollo";

import { HALLS_ENDPOINTS } from "../../../../endpoints";
import { HALL_QUERY, HALLS_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HallsService {
	readonly hallsQuery = this._apolloService.watchQuery<any>({
		query: HALLS_QUERY,
		variables: { take: 5, skip: 0 }
	});

	readonly halls$ = this.hallsQuery.valueChanges.pipe(map(({ data }) => data.halls.data));

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async refetchHalls() {
		await this.hallsQuery.refetch();
	}

	getHall(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: HALL_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.hall));
	}

	createHall(hall: Partial<IHall>) {
		return this._apiService.post<IHall>(HALLS_ENDPOINTS.CREATE_HALL, hall);
	}

	updateHall(id: string, hall: Partial<IHall>) {
		return this._apiService.patch<IHall>(HALLS_ENDPOINTS.UPDATE_HALL.replace(DYNAMIC_ID, id), hall);
	}

	deleteHall(id: string) {
		return this._apiService.delete(HALLS_ENDPOINTS.DELETE_HALL.replace(DYNAMIC_ID, id));
	}
}

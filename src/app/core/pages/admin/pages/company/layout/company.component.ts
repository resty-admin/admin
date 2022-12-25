import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { switchMap, take, tap } from "rxjs";
import { COMPANY_ID } from "src/app/shared/constants";
import { ApolloService } from "src/app/shared/modules/apollo";

import { COMPANIES_AND_PLACES_QUERY } from "../../../../../../shared/modules/companies";
import { AsideService } from "../../../services/aside/aside.service";

@UntilDestroy()
@Component({
	selector: "app-company",
	templateUrl: "./company.component.html",
	styleUrls: ["./company.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent implements OnInit {
	constructor(
		private readonly _apolloService: ApolloService,
		private readonly _asideService: AsideService,
		private readonly _activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this._activatedRoute.paramMap
			.pipe(
				untilDestroyed(this),
				tap((paramMap) => {
					this._asideService.activeCompanyIdSubject.next(paramMap.get(COMPANY_ID.slice(1)) || "");
				}),
				switchMap(() =>
					this._apolloService
						.watchQuery<any>({ query: COMPANIES_AND_PLACES_QUERY, variables: { take: 5, skip: 0 } })
						.valueChanges.pipe(
							tap(({ data }) => {
								const { places, companies } = data;
								this._asideService.companiesBehaviourSubject.next(companies.data);
								this._asideService.placesBehaviourSubject.next(places.data);
							}),
							take(1)
						)
				)
			)
			.subscribe();
	}
}

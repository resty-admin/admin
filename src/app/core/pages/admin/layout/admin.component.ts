import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { catchError, filter, map, of, switchMap } from "rxjs";

import { AsideService } from "../../../../features/app";
import { AuthService } from "../../../../features/auth/services";
import { CompaniesService } from "../../../../features/companies";
import { OrdersService } from "../../../../features/orders";
import { PlacesService } from "../../../../features/places";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "../../../../shared/constants";
import { RouterService } from "../../../../shared/modules/router";
import type { IAction } from "../../../../shared/ui/actions";
import { AdminPageGQL } from "../graphql/admin-page";

@UntilDestroy()
@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
	readonly profileActions: IAction<any>[] = [
		{
			label: "Профиль",
			icon: "profile",
			func: async () => {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.PROFILE.absolutePath);
			}
		},
		{
			label: "Выйти",
			icon: "exit",
			func: async () => {
				await this._authService.signOut();
			}
		}
	];

	readonly placeActions = this._placesService.actions;
	readonly companyActions = this._companiesService.actions;

	readonly isAsideOpen$ = this._asideService.isOpen$;

	readonly user$ = this._authService.me$;

	readonly activeOrder$ = this._ordersService.activeOrderId$.pipe(
		filter((orderId) => Boolean(orderId)),
		switchMap((orderId) => this._adminPageGQL.watch({ orderId: orderId! }).valueChanges),
		map((result) => result.data.order),
		catchError(() => of(null))
	);

	readonly places$ = this._placesService.placesQuery.valueChanges.pipe(map((result) => result.data.places.data));

	readonly companies$ = this._companiesService.companiesQuery.valueChanges.pipe(
		map((result) => result.data.companies.data)
	);

	constructor(
		private readonly _adminPageGQL: AdminPageGQL,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService,
		private readonly _asideService: AsideService,
		private readonly _companiesService: CompaniesService,
		private readonly _placesService: PlacesService,
		private readonly _ordersService: OrdersService
	) {}

	ngOnInit() {
		this._placesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._companiesService.companiesQuery.refetch();
		});

		this._companiesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._companiesService.companiesQuery.refetch();
		});
	}

	toggleAside() {
		this._asideService.toggleAside();
	}

	async openCreateCompanyDialog() {
		const result = await this._companiesService.openCreateCompanyDialog();

		if (!result?.data?.createCompany) {
			return;
		}

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, result.data.createCompany.id)
		);
	}

	async openCreatePlaceDialog() {
		const company = this._routerService.getParams(COMPANY_ID.slice(1));

		if (!company) {
			return;
		}

		const result = await this._placesService.openCreatePlaceDialog({ company });

		if (!result.data?.createPlace) {
			return;
		}

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.PLACE.absolutePath.replace(COMPANY_ID, company).replace(PLACE_ID, result.data.createPlace.id)
		);
	}

	async signOut() {
		await this._authService.signOut();
	}
}

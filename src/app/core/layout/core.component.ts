import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ChildrenOutletContexts, NavigationStart, Router } from "@angular/router";
import { AsideService } from "@features/app";
import { AuthService } from "@features/auth";
import { CompaniesService, CompanyDialogComponent } from "@features/companies";
import { OrdersService } from "@features/orders";
import { PlaceDialogComponent, PlacesService } from "@features/places";
import type { CompanyEntity, PlaceEntity } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { routerAnimation } from "@shared/animations";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "@shared/constants";
import { ASIDE_PAGES } from "@shared/data";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { ThemeService } from "@shared/modules/theme";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { combineLatest, filter, from, map, shareReplay, startWith, switchMap, take } from "rxjs";

import { AdminCompaniesGQL, AdminOrderGQL, AdminPlacesGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-core",
	templateUrl: "./core.component.html",
	styleUrls: ["./core.component.scss"],
	animations: [routerAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent implements OnInit {
	readonly isAsideOpen$ = this._asideService.isOpen$;

	private readonly _adminCompaniesQuery = this._adminCompaniesGQL.watch();
	private readonly _adminPlacesQuery = this._adminPlacesGQL.watch();

	readonly user$ = this._authService.me$.pipe(filter((user) => Boolean(user)));

	readonly companies$ = this._adminCompaniesQuery.valueChanges.pipe(map((result) => result.data.companies.data));

	readonly companyId$ = this._routerService.selectParams().pipe(
		map(({ companyId }) => companyId),
		shareReplay({ refCount: true })
	);

	readonly places$ = this.companyId$.pipe(
		filter((companyId) => Boolean(companyId)),
		switchMap((companyId) =>
			this._adminPlacesQuery.setVariables({
				filtersArgs: [
					{
						key: "company.id",
						operator: "=",
						value: companyId
					}
				]
			})
		),
		switchMap(() => this._adminPlacesQuery.valueChanges),
		map((result) => result.data.places.data)
	);

	readonly placeId$ = this.places$.pipe(
		take(1),
		switchMap(() =>
			this._routerService.selectParams().pipe(
				map(({ placeId }) => placeId),
				shareReplay({ refCount: true })
			)
		)
	);

	readonly pages$ = combineLatest([
		this.companyId$.pipe(startWith(null)),
		this.placeId$.pipe(startWith(null)),
		this.user$
	]).pipe(
		map(([companyId, placeId, me]) =>
			ASIDE_PAGES.map((page) => ({
				...page,
				routerLink: page.routerLink.replace(COMPANY_ID, companyId).replace(PLACE_ID, placeId),
				disabled: !companyId || !placeId || !me
			})).filter((page) => (me ? page.roles.includes(me.role) : true))
		)
	);

	readonly activeOrder$ = this._ordersService.activeOrderId$.pipe(
		filter((orderId) => Boolean(orderId)),
		switchMap((orderId) => this._adminOrderGQL.fetch({ orderId: orderId! })),
		map((result) => result.data.order),
		shareReplay({ refCount: true })
	);

	readonly isClient$ = this._router.events.pipe(
		untilDestroyed(this),
		startWith(this._router),
		filter((event) => event instanceof NavigationStart),
		map((event) => !(event as NavigationStart).url.includes("/auth")),
		shareReplay({ refCount: true })
	);

	constructor(
		private readonly _adminOrderGQL: AdminOrderGQL,
		private readonly _adminCompaniesGQL: AdminCompaniesGQL,
		private readonly _adminPlacesGQL: AdminPlacesGQL,
		private readonly _dialogService: DialogService,
		private readonly _companiesService: CompaniesService,
		private readonly _placesService: PlacesService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService,
		private readonly _childrenOutletContexts: ChildrenOutletContexts,
		private readonly _ordersService: OrdersService,
		private readonly _asideService: AsideService,
		private readonly _router: Router,
		private readonly _themeService: ThemeService
	) {}

	getRouteAnimationData() {
		return this._childrenOutletContexts.getContext("primary")?.route?.snapshot?.data?.["animation"];
	}

	ngOnInit() {
		this.user$.pipe(take(1)).subscribe(async (user) => {
			if (user && !user.name) {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.PROFILE.absolutePath);
			}
		});

		this._authService.language$.pipe(untilDestroyed(this)).subscribe((lang) => {
			this._i18nService.setActiveLang(lang);
		});

		this._authService.theme$.pipe(untilDestroyed(this)).subscribe((theme) => {
			this._themeService.setTheme(theme);
		});
	}

	toggleAside() {
		this._asideService.toggleAside();
	}

	async navigateToCompany(companyId: string) {
		if (!companyId || companyId === this._routerService.getParams(COMPANY_ID.slice(1))) {
			return;
		}

		await this._routerService.navigateByUrl(ADMIN_ROUTES.PLACES.absolutePath.replace(COMPANY_ID, companyId));
	}

	async navigateToPlace(placeId: string) {
		if (!placeId || placeId === this._routerService.getParams(PLACE_ID.slice(1))) {
			return;
		}

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.STATISTIC.absolutePath
				.replace(COMPANY_ID, this._routerService.getParams(COMPANY_ID.slice(1)))
				.replace(PLACE_ID, placeId)
		);
	}

	openCreateCompanyDialog() {
		this._dialogService
			.open(CompanyDialogComponent)
			.afterClosed$.pipe(
				filter((company) => Boolean(company)),
				switchMap((company) =>
					this._companiesService.createCompany({ name: company.name }).pipe(
						switchMap((result) => from(this._adminCompaniesQuery.refetch()).pipe(map(() => result))),
						this._toastrService.observe(this._i18nService.translate("COMPANIES.CREATE"))
					)
				),
				take(1)
			)
			.subscribe(async (result) => {
				if (!result?.data?.createCompany) {
					return;
				}

				await this._routerService.navigateByUrl(
					ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, result.data.createCompany.id)
				);
			});
	}

	openUpdateCompanyDialog(data: AtLeast<CompanyEntity, "id">) {
		this._dialogService
			.open(CompanyDialogComponent, { data })
			.afterClosed$.pipe(
				filter((company) => Boolean(company)),
				switchMap((company) =>
					this._companiesService.updateCompany({ id: company.id, name: company.name }).pipe(
						switchMap(() => this._adminCompaniesQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("COMPAMINIES.UPDATE"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteCompanyDialog(value: AtLeast<CompanyEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("COMPANIES.CONFIRM"), value }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._companiesService.deleteCompany(value.id).pipe(
						switchMap(() => this._adminCompaniesQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("COMPANIES.DELETE"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openCreatePlaceDialog() {
		const company = this._routerService.getParams(COMPANY_ID.slice(1));

		this._dialogService
			.open(PlaceDialogComponent)
			.afterClosed$.pipe(
				filter((place) => Boolean(place)),
				switchMap((place) =>
					this._placesService
						.createPlace({ name: place.name, company, address: place.address, file: place.file?.id })
						.pipe(
							switchMap((result) => from(this._adminPlacesQuery.refetch()).pipe(map(() => result))),
							this._toastrService.observe(this._i18nService.translate("PLACES.CREATE"))
						)
				),
				take(1)
			)
			.subscribe(async (result) => {
				if (!result?.data?.createPlace) {
					return;
				}

				await this._routerService.navigateByUrl(
					ADMIN_ROUTES.PLACE.absolutePath.replace(COMPANY_ID, company).replace(PLACE_ID, result.data.createPlace.id)
				);
			});
	}

	openUpdatePlaceDialog(data: AtLeast<PlaceEntity, "id">) {
		this._dialogService
			.open(PlaceDialogComponent, { data })
			.afterClosed$.pipe(
				filter((place) => Boolean(place)),
				switchMap((place) =>
					this._placesService
						.updatePlace({ id: place.id, name: place.name, address: place.address, file: place.file?.id })
						.pipe(
							switchMap(() => this._adminPlacesQuery.refetch()),
							this._toastrService.observe(this._i18nService.translate("PLACES.UPDATE"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openDeletePlaceDialog(value: AtLeast<PlaceEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("PLACES.CONFIRM"), value }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._placesService.deletePlace(value.id).pipe(
						switchMap(() => this._adminPlacesQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("PLACES.DELETE"))
					)
				)
			)
			.subscribe(() => {});
	}

	async signOut() {
		await this._authService.signOut();
		await this._routerService.navigateByUrl(ADMIN_ROUTES.SIGN_IN.absolutePath);
	}
}

import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ADMIN_PAGE_I18N } from "@core/pages/admin/constants";
import { AsideService } from "@features/app";
import { AuthService } from "@features/auth/services";
import { CompaniesService, CompanyDialogComponent } from "@features/companies";
import { OrdersService } from "@features/orders";
import { PlaceDialogComponent, PlacesService } from "@features/places";
import type { CompanyEntity, PlaceEntity } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import type { IAction } from "@shared/ui/actions";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { catchError, filter, lastValueFrom, map, of, switchMap, take } from "rxjs";

import { AdminCompaniesGQL, AdminPageGQL, AdminPlacesGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
	readonly adminPageI18n = ADMIN_PAGE_I18N;
	readonly profileActions: IAction[] = [
		{
			label: "Профиль",
			icon: "profile",
			func: () => this._routerService.navigateByUrl(ADMIN_ROUTES.PROFILE.absolutePath)
		},
		{
			label: "Выйти",
			icon: "exit",
			func: () => this.signOut()
		}
	];

	readonly placeActions: IAction<PlaceEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (place) => this.openUpdatePlaceDialog(place)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (place) => this.openDeletePlaceDialog(place)
		}
	];

	readonly companyActions: IAction<CompanyEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (company) => this.openUpdateCompanyDialog(company)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (company) => this.openDeleteCompanyDialog(company)
		}
	];

	readonly isAsideOpen$ = this._asideService.isOpen$;

	readonly user$ = this._authService.me$;

	readonly activeOrder$ = this._ordersService.activeOrderId$.pipe(
		filter((orderId) => Boolean(orderId)),
		switchMap((orderId) => this._adminPageGQL.watch({ orderId: orderId! }).valueChanges),
		map((result) => result.data.order),
		catchError(() => of(null))
	);

	private readonly _adminPlacesQuery = this._adminPlacesGQL.watch();

	readonly places$ = this._adminPlacesQuery.valueChanges.pipe(map((result) => result.data.places.data));

	private readonly _adminCompaniesQuery = this._adminCompaniesGQL.watch();
	readonly companies$ = this._adminCompaniesQuery.valueChanges.pipe(map((result) => result.data.companies.data));
	readonly activeCompanyId$ = this._routerService.selectParams().pipe(map((params) => params["companyId"]));
	readonly activePlaceId$ = this._routerService.selectParams().pipe(map((params) => params["placeId"]));

	constructor(
		private readonly _adminCompaniesGQL: AdminCompaniesGQL,
		private readonly _adminPlacesGQL: AdminPlacesGQL,
		private readonly _adminPageGQL: AdminPageGQL,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService,
		private readonly _asideService: AsideService,
		private readonly _companiesService: CompaniesService,
		private readonly _placesService: PlacesService,
		private readonly _ordersService: OrdersService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async ngOnInit() {
		this._placesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._adminPlacesQuery.refetch();
		});

		this._companiesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._adminCompaniesQuery.refetch();
		});

		const user = await lastValueFrom(this.user$.pipe(take(1)));

		if (user?.email || user?.tel) {
			return;
		}

		await this._routerService.navigateByUrl(ADMIN_ROUTES.WELCOME.absolutePath);
	}

	toggleAside() {
		this._asideService.toggleAside();
	}

	async changeUrlWithCompany(companyId: string) {
		if (!companyId) {
			return;
		}

		await this._routerService.navigateByUrl(ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, companyId));
	}

	async changeUrlWithPlace(placeId: string) {
		const companyId = this._routerService.getParams(COMPANY_ID.slice(1));

		if (!companyId || !placeId) {
			return;
		}

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.PLACE.absolutePath.replace(COMPANY_ID, companyId).replace(PLACE_ID, placeId)
		);
	}

	async openCreateCompanyDialog() {
		const company: CompanyEntity | undefined = await lastValueFrom(
			this._dialogService.open(CompanyDialogComponent).afterClosed$
		);

		if (!company) {
			return;
		}

		const result = await lastValueFrom(
			this._companiesService
				.createCompany({ name: company.name, logo: company.logo?.id })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.adminPageI18n),
						this._i18nService.translate("title", {}, this.adminPageI18n)
					)
				)
		);

		if (!result?.data?.createCompany) {
			return;
		}

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, result.data.createCompany.id)
		);
	}

	async openUpdateCompanyDialog(data: AtLeast<CompanyEntity, "id">) {
		const company: CompanyEntity | undefined = await lastValueFrom(
			this._dialogService.open(CompanyDialogComponent, { data }).afterClosed$
		);

		if (!company) {
			return;
		}

		await lastValueFrom(
			this._companiesService
				.updateCompany({ id: company.id, name: company.name, logo: company.logo?.id })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.adminPageI18n),
						this._i18nService.translate("title", {}, this.adminPageI18n)
					)
				)
		);
	}

	async openDeleteCompanyDialog(value: AtLeast<CompanyEntity, "id">) {
		const config = { data: { title: this._i18nService.translate("confirm", {}, this.adminPageI18n), value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(
			this._companiesService
				.deleteCompany(value.id)
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.adminPageI18n),
						this._i18nService.translate("title", {}, this.adminPageI18n)
					)
				)
		);
	}

	async openCreatePlaceDialog() {
		const company = this._routerService.getParams(COMPANY_ID.slice(1));

		if (!company) {
			return;
		}

		const place: PlaceEntity | undefined = await lastValueFrom(
			this._dialogService.open(PlaceDialogComponent).afterClosed$
		);

		if (!place) {
			return;
		}

		const result = await lastValueFrom(
			this._placesService
				.createPlace({ name: place.name, company, address: place.address, file: place.file?.id })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.adminPageI18n),
						this._i18nService.translate("title", {}, this.adminPageI18n)
					)
				)
		);

		if (!result.data?.createPlace) {
			return;
		}

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.PLACE.absolutePath.replace(COMPANY_ID, company).replace(PLACE_ID, result.data.createPlace.id)
		);
	}

	async openUpdatePlaceDialog(data: AtLeast<PlaceEntity, "id">) {
		const place: PlaceEntity | undefined = await lastValueFrom(
			this._dialogService.open(PlaceDialogComponent, { data }).afterClosed$
		);

		if (!place) {
			return;
		}

		await lastValueFrom(
			this._placesService
				.updatePlace({ id: place.id, name: place.name, address: place.address, file: place.file?.id })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.adminPageI18n),
						this._i18nService.translate("title", {}, this.adminPageI18n)
					)
				)
		);
	}

	async openDeletePlaceDialog(value: AtLeast<PlaceEntity, "id">) {
		const config = { data: { title: this._i18nService.translate("title", {}, this.adminPageI18n), value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(
			this._placesService
				.deletePlace(value.id)
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.adminPageI18n),
						this._i18nService.translate("title", {}, this.adminPageI18n)
					)
				)
		);
	}

	async signOut() {
		await this._authService.signOut();
		window.location.href = ADMIN_ROUTES.SIGN_IN.absolutePath;
	}
}

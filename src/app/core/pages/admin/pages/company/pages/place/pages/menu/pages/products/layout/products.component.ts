import type { AfterViewInit, OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map } from "rxjs";
import { ProductsService } from "src/app/features/products";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

import { ActionsService } from "../../../../../../../../../../../../features/app";
import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import { DialogService } from "../../../../../../../../../../../../shared/ui/dialog";
import { PRODUCTS_PAGE_I18N } from "../constants";
import { ProductsPageGQL } from "../graphql/products-page";

@UntilDestroy()
@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements AfterViewInit, OnInit, OnDestroy {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	readonly productsPageI18n = PRODUCTS_PAGE_I18N;
	private readonly _productsPageQuery = this._productsPageGQL.watch();

	readonly products$: Observable<any> = this._productsPageQuery.valueChanges.pipe(
		map((result) => result.data.products.data)
	);

	readonly actions = this._productsService.actions;

	columns: IDatatableColumn[] = [];

	constructor(
		private readonly _productsPageGQL: ProductsPageGQL,
		private readonly _productsService: ProductsService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _actionsService: ActionsService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._productsService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._productsPageQuery.refetch();
		});

		this._actionsService.setAction({
			label: "Добавить блюдо",
			func: () => this.openCreateProductDialog()
		});

		await this._productsPageQuery.setVariables({
			filtersArgs: [{ key: "category.place.id", operator: "=", value: placeId }]
		});
	}

	openCreateProductDialog() {
		this._productsService.openCreateProductDialog().subscribe();
	}

	ngAfterViewInit() {
		this.columns = [
			{
				prop: "name",
				name: "Название"
			},
			{
				prop: "description",
				name: "Описание"
			},
			{
				prop: "category.name",
				name: "Категория"
			},
			{
				prop: "price",
				name: "Цена"
			},
			{
				cellTemplate: this.moreTemplate
			}
		];
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}

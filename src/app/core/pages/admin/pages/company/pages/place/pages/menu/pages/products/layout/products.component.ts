import type { AfterViewInit, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map } from "rxjs";
import { ProductsService } from "src/app/features/products";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import { ProductsPageGQL } from "../graphql/products-page";

@UntilDestroy()
@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements AfterViewInit, OnInit {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	readonly actions = this._productsService.actions;

	columns: IDatatableColumn[] = [];

	private readonly _productsPageQuery = this._productsPageGQL.watch();

	readonly products$: Observable<any> = this._productsPageQuery.valueChanges.pipe(
		map((result) => result.data.products.data)
	);

	constructor(
		private readonly _productsService: ProductsService,
		private readonly _productsPageGQL: ProductsPageGQL,
		private readonly _routerService: RouterService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._productsPageQuery.setVariables({
					filtersArgs: [{ key: "category.place.id", operator: "=", value: placeId }]
				});
			});
	}

	openCreateProductDialog() {
		this._productsService.openCreateOrUpdateProductDialog().subscribe();
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
}

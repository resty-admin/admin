import type { AfterViewInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { ProductsService } from "src/app/features/products";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

@UntilDestroy()
@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements AfterViewInit {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	readonly products$: Observable<any> = this._productsService.products$;

	readonly actions = this._productsService.actions;

	columns: IDatatableColumn[] = [];

	constructor(private readonly _productsService: ProductsService) {}

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

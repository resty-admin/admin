import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { OrderInfoModule, OrderInfoSkeletonModule } from "@features/orders/ui";
import { ProductsToOrderSelectModule, ProductsToOrderSelectSkeletonModule } from "@features/products/ui";
import { ProductToOrderModule } from "@features/products/ui";
import { PreviewTableModule } from "@features/tables/ui";
import { UsersSelectModule, UsersSelectSkeletonModule } from "@features/users/ui";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { RadioButtonModule } from "@shared/ui/radio-button";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TabsModule } from "@shared/ui/tabs";
import { TextareaModule } from "@shared/ui/textarea";
import { TypographyModule } from "@shared/ui/typography";

import { ActiveOrderRoutingModule } from "./active-order-routing.module";
import { ACTIVE_ORDER_COMPONENTS } from "./components";
import { ActiveOrderComponent } from "./layout/active-order.component";
import { AttributesPipe } from "./pipes/attributes.pipe";

@NgModule({
	declarations: [ActiveOrderComponent, ...ACTIVE_ORDER_COMPONENTS, AttributesPipe],
	exports: [AttributesPipe],
	imports: [
		CommonModule,
		ActiveOrderRoutingModule,
		TypographyModule,
		ProductToOrderModule,
		I18nModule,
		ReactiveFormsModule,
		ImageModule,
		IconModule,
		PreviewTableModule,
		ButtonModule,
		OrderInfoModule,
		UsersSelectModule,
		TextareaModule,
		UsersSelectSkeletonModule,
		SkeletonModule,
		OrderInfoSkeletonModule,
		ProductsToOrderSelectModule,
		ProductsToOrderSelectSkeletonModule,
		TabsModule,
		RadioButtonModule,
		DatatableModule
	]
})
export class ActiveOrderModule {}

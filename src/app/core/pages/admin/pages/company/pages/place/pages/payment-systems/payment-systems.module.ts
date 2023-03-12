import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PaymentSystemModule, PaymentSystemSkeletonModule } from "@features/payment-systems";
import { PaymentSystemDialogModule } from "@features/payment-systems/ui";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { FiltersModule } from "@shared/ui/filters";
import { FiltersSkeletonModule } from "@shared/ui/filters-skeleton";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { ListModule } from "@shared/ui/list";
import { ListSkeletonModule } from "@shared/ui/list-skeleton";
import { PagerModule } from "@shared/ui/pager";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { PAYMENT_SYSTEMS_COMPONENTS } from "./components";
import { PaymentSystemsComponent } from "./layout/payment-systems.component";
import { PaymentSystemsRoutingModule } from "./payment-systems-routing.module";

@NgModule({
	declarations: [PaymentSystemsComponent, ...PAYMENT_SYSTEMS_COMPONENTS],
	imports: [
		CommonModule,
		PaymentSystemsRoutingModule,
		InputModule,
		ReactiveFormsModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		IconModule,
		ImageModule,
		I18nModule,
		ListModule,
		FiltersModule,
		PaymentSystemDialogModule,
		PaymentSystemModule,
		SkeletonModule,
		FiltersSkeletonModule,
		PaymentSystemSkeletonModule,
		ListSkeletonModule,
		PagerModule
	]
})
export class PaymentSystemsModule {}

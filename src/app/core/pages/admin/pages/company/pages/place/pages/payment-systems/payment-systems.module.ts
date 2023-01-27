import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PaymentSystemModule, PaymentSystemSkeletonModule } from "@features/payment-systems";
import { PaymentSystemDialogModule } from "@features/payment-systems/ui";
import { TranslocoModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { FiltersModule } from "@shared/ui/filters";
import { FiltersSkeletonModule } from "@shared/ui/filters-skeleton";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { ListModule } from "@shared/ui/list";
import { ListSkeletonModule } from "@shared/ui/list-skeleton";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { PAYMENT_SYSTEMS_COMPONENTS } from "./components";
import { PaymentSystemsComponent } from "./layout/payment-systems.component";
import { PaymentSystemsRoutingModule } from "./payment-systems-routing.module";
import { PAYMENT_SYSTEMS_PROVIDERS } from "./providers";

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
		TranslocoModule,
		ListModule,
		FiltersModule,
		PaymentSystemDialogModule,
		PaymentSystemModule,
		SkeletonModule,
		FiltersSkeletonModule,
		PaymentSystemSkeletonModule,
		ListSkeletonModule
	],
	providers: PAYMENT_SYSTEMS_PROVIDERS
})
export class PaymentSystemsModule {}

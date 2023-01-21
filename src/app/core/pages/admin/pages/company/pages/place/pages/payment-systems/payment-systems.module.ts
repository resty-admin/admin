import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PaymentSystemModule } from "@features/payment-systems";
import { PaymentSystemDialogModule } from "@features/payment-systems/ui/payment-system-dialog/payment-system-dialog.module";
import { TranslocoModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { FiltersModule } from "@shared/ui/filters";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { ListModule } from "@shared/ui/list";
import { TypographyModule } from "@shared/ui/typography";

import { PaymentSystemsComponent } from "./layout/payment-systems.component";
import { PaymentSystemsRoutingModule } from "./payment-systems-routing.module";
import { PAYMENT_SYSTEMS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [PaymentSystemsComponent],
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
		PaymentSystemModule
	],
	providers: PAYMENT_SYSTEMS_PROVIDERS
})
export class PaymentSystemsModule {}

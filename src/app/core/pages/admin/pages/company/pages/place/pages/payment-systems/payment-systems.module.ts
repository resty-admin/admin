import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getScopeProvider } from "../../../../../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { PaymentSystemsComponent } from "./layout/payment-systems.component";
import { PaymentSystemsRoutingModule } from "./payment-systems-routing.module";

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
		TranslocoModule
	],
	providers: [getScopeProvider("paymentSystems", (lang) => import(`./i18n/${lang}.json`))]
})
export class PaymentSystemsModule {}

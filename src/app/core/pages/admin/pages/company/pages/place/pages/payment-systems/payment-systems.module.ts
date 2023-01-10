import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getI18nProvider } from "../../../../../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { FiltersModule } from "../../../../../../../../../shared/ui/filters";
import { ListModule } from "../../../../../../../../../shared/ui/list";
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
		TranslocoModule,
		ListModule,
		FiltersModule
	],
	providers: [getI18nProvider("paymentSystems", (lang) => import(`./i18n/${lang}.json`))]
})
export class PaymentSystemsModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getI18nProvider } from "../../../../../../../../../shared/i18n";
import { I18nModule } from "../../../../../../../../../shared/modules/i18n";
import { PdfModule } from "../../../../../../../../../shared/modules/pdf";
import { ButtonModule } from "../../../../../../../../../shared/ui/button";
import { IconModule } from "../../../../../../../../../shared/ui/icon";
import { ContractRoutingModule } from "./contract-routing.module";
import { ContractComponent } from "./layout/contract.component";

@NgModule({
	declarations: [ContractComponent],
	imports: [CommonModule, ContractRoutingModule, TypographyModule, PdfModule, ButtonModule, IconModule, I18nModule],
	providers: [getI18nProvider("contract", (lang) => import(`./i18n/${lang}.json`))]
})
export class ContractModule {}

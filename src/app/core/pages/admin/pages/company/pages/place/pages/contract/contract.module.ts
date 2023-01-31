import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { PdfModule } from "@shared/modules/pdf";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { TypographyModule } from "@shared/ui/typography";

import { ContractRoutingModule } from "./contract-routing.module";
import { ContractComponent } from "./layout/contract.component";

@NgModule({
	declarations: [ContractComponent],
	imports: [CommonModule, ContractRoutingModule, TypographyModule, PdfModule, ButtonModule, IconModule, I18nModule]
})
export class ContractModule {}

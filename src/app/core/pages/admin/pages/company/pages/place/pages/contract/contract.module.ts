import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { I18nModule } from "../../../../../../../../../shared/modules/i18n";
import { PdfModule } from "../../../../../../../../../shared/modules/pdf";
import { ButtonModule } from "../../../../../../../../../shared/ui/button";
import { IconModule } from "../../../../../../../../../shared/ui/icon";
import { ContractRoutingModule } from "./contract-routing.module";
import { ContractComponent } from "./layout/contract.component";
import { CONTRACT_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ContractComponent],
	imports: [CommonModule, ContractRoutingModule, TypographyModule, PdfModule, ButtonModule, IconModule, I18nModule],
	providers: CONTRACT_PROVIDERS
})
export class ContractModule {}

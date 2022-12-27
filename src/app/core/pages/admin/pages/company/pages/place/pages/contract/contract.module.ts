import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PdfModule } from "../../../../../../../../../shared/modules/pdf";
import { ButtonModule } from "../../../../../../../../../shared/ui/button";
import { IconModule } from "../../../../../../../../../shared/ui/icon";
import { ContractRoutingModule } from "./contract-routing.module";
import { ContractComponent } from "./layout/contract.component";

@NgModule({
	declarations: [ContractComponent],
	imports: [CommonModule, ContractRoutingModule, TypographyModule, PdfModule, ButtonModule, IconModule],
	exports: [ContractComponent]
})
export class ContractModule {}

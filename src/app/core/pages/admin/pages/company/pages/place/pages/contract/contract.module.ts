import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ContractRoutingModule } from "./contract-routing.module";
import { ContractComponent } from "./layout/contract.component";

@NgModule({
	declarations: [ContractComponent],
	imports: [CommonModule, ContractRoutingModule, TypographyModule],
	exports: [ContractComponent]
})
export class ContractModule {}

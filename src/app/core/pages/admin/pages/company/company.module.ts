import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LinkModule } from "src/app/shared/ui/link";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CompanyRoutingModule } from "./company-routing.module";
import { CompanyComponent } from "./layout/company.component";

@NgModule({
	declarations: [CompanyComponent],
	imports: [CommonModule, CompanyRoutingModule, TypographyModule, LinkModule],
	exports: [CompanyComponent]
})
export class CompanyModule {}

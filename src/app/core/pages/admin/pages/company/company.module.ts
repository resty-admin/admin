import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LinkModule } from "@shared/ui/link";
import { TypographyModule } from "@shared/ui/typography";

import { CompanyRoutingModule } from "./company-routing.module";
import { CompanyComponent } from "./layout/company.component";

@NgModule({
	declarations: [CompanyComponent],
	imports: [CommonModule, CompanyRoutingModule, TypographyModule, LinkModule]
})
export class CompanyModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { AccountingSystemSkeletonComponent } from "./layout/accounting-system-skeleton.component";

@NgModule({
	declarations: [AccountingSystemSkeletonComponent],
	imports: [CommonModule, TypographyModule, SkeletonModule],
	exports: [AccountingSystemSkeletonComponent]
})
export class AccountingSytemSkeletonModule {}

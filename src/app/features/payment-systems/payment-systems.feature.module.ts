import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { ButtonModule } from "../../shared/ui/button";
import { FileModule } from "../../shared/ui/file";
import { InputModule } from "../../shared/ui/input";
import { TypographyModule } from "../../shared/ui/typography";
import { PAYMENT_SYSTEMS_COMPONENTS } from "./components";

@NgModule({
	declarations: PAYMENT_SYSTEMS_COMPONENTS,
	imports: [CommonModule, ButtonModule, TypographyModule, InputModule, FileModule, ReactiveFormsModule],
	exports: PAYMENT_SYSTEMS_COMPONENTS
})
export class AccountingSystemFeatureModule {}

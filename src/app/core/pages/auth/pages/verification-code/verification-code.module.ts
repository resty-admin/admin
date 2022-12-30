import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "src/app/shared/modules/i18n";
import { CodeInputModule } from "src/app/shared/ui/code-input";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { VerificationCodeComponent } from "./layout/verification-code.component";
import { VerificationCodeRoutingModule } from "./verification-code-routing.module";

@NgModule({
	declarations: [VerificationCodeComponent],
	imports: [
		CommonModule,
		VerificationCodeRoutingModule,
		I18nModule,
		CodeInputModule,
		TypographyModule,
		ImageModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class VerificationCodeModule {}

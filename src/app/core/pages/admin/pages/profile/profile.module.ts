import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { LinkModule } from "src/app/shared/ui/link";
import { TypographyModule } from "src/app/shared/ui/typography";

import { I18nModule } from "../../../../../shared/modules/i18n";
import { ThemeModule } from "../../../../../shared/modules/theme";
import { LanguageSelectModule } from "../../../../../shared/ui/language-select";
import { ProfileComponent } from "./layout/profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { PROFILE_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ProfileComponent],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		TypographyModule,
		LinkModule,
		InputModule,
		ImageModule,
		LanguageSelectModule,
		ThemeModule,
		ReactiveFormsModule,
		I18nModule
	],
	providers: PROFILE_PROVIDERS
})
export class ProfileModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ThemeModule } from "@shared/modules/theme";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { LanguageSelectModule } from "@shared/ui/language-select";
import { LinkModule } from "@shared/ui/link";
import { ThemeToggleModule } from "@shared/ui/theme-toggle";
import { TypographyModule } from "@shared/ui/typography";

import { ProfileComponent } from "./layout/profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";

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
		I18nModule,
		ThemeToggleModule
	]
})
export class ProfileModule {}

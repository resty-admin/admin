import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "src/app/shared/modules/i18n";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { LinkModule } from "src/app/shared/ui/link";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getScopeProvider } from "../../../../../shared/i18n";
import { RoleComponent } from "./layout/role.component";
import { RoleRoutingModule } from "./role-routing.module";

@NgModule({
	declarations: [RoleComponent],
	imports: [CommonModule, RoleRoutingModule, I18nModule, LinkModule, TypographyModule, IconModule, ImageModule],
	providers: [getScopeProvider("role", (lang) => import(`./i18n/${lang}.json`))]
})
export class RoleModule {}
